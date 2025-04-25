import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  @SubscribeMessage('join')
  async handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.activeUsers.set(userId, client.id);
    this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));

    // Ask Django to mark all pending messages as delivered
    await axios.post(`http://localhost:8000/api/messages/mark-delivered/`, { userId });
  }

  @SubscribeMessage('disconnectUser')
  handleDisconnect(@MessageBody() userId: string) {
    this.activeUsers.delete(userId);
    this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));
  }

  @SubscribeMessage('openChat')
  async handleOpenChat(@MessageBody() { senderId, receiverId }: { senderId: string; receiverId: string }) {
    await axios.post(`http://localhost:8000/api/messages/mark-read/`, { senderId, receiverId });

    const receiverSocketId = this.activeUsers.get(receiverId);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('messageSeen', { sender: senderId });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessages(
    @MessageBody() { sender, receiver, message }: { sender: string; receiver: string; message: string }
  ) {
    const receiverSocket = this.activeUsers.get(receiver);

    const response = await axios.post(`http://localhost:8000/api/messages/send/`, {
      sender,
      receiver,
      message,
      delivered: !!receiverSocket,
    });

    const msgData = response.data;

    if (receiverSocket) {
      this.server.to(receiverSocket).emit('newMessage', {
        sender,
        message,
        delivered: true,
        ...msgData,
      });
    }

    const senderSocket = this.activeUsers.get(sender);
    if (senderSocket) {
      this.server.to(senderSocket).emit('newMessage', {
        sender,
        message,
        ...msgData,
      });
    }
  }
}
