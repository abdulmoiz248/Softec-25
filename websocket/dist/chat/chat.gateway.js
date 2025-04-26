"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const axios_1 = require("axios");
let ChatGateway = class ChatGateway {
    server;
    activeUsers = new Map();
    handleConnection(client) {
        console.log('Client connected', client.id);
    }
    async handleJoin(userId, client) {
        this.activeUsers.set(userId, client.id);
        this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));
        await axios_1.default.post(`http://localhost:8000/api/messages/mark-delivered/`, { userId });
    }
    handleDisconnect(userId) {
        this.activeUsers.delete(userId);
        this.server.emit('activeUsers', Array.from(this.activeUsers.keys()));
    }
    async handleOpenChat({ senderId, receiverId }) {
        await axios_1.default.post(`http://localhost:8000/api/messages/mark-read/`, { senderId, receiverId });
        const receiverSocketId = this.activeUsers.get(receiverId);
        if (receiverSocketId) {
            this.server.to(receiverSocketId).emit('messageSeen', { sender: senderId });
        }
    }
    async handleMessages({ sender, receiver, message }) {
        const receiverSocket = this.activeUsers.get(receiver);
        const response = await axios_1.default.post(`http://localhost:8000/api/messages/send/`, {
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
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('disconnectUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('openChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleOpenChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessages", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        },
    })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map