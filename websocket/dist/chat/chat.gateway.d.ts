import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private activeUsers;
    handleConnection(client: Socket): void;
    handleJoin(userId: string, client: Socket): Promise<void>;
    handleDisconnect(userId: string): void;
    handleOpenChat({ senderId, receiverId }: {
        senderId: string;
        receiverId: string;
    }): Promise<void>;
    handleMessages({ sender, receiver, message }: {
        sender: string;
        receiver: string;
        message: string;
    }): Promise<void>;
}
