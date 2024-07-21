import { Logger } from "@nestjs/common"; // Import Logger for logging
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"; // Import WebSocket decorators and interfaces
import { Socket } from "socket.io"; // Import Socket type from socket.io
import { Server } from "socket.io"; // Import Server type from socket.io
import { ChatService } from "./services/chats.service"; // Import ChatService

@WebSocketGateway(5002, {namespace: '/chat', cors: true}) // Define the WebSocket gateway, set port 5002, namespace, and enable CORS
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect // Implement necessary interfaces
{
  constructor(
    private readonly chatService: ChatService, // Inject ChatService for chat-related operations
  ) {}
  
  private readonly logger = new Logger(ChatGateway.name); // Create a logger instance

  @WebSocketServer() io: Server; // Define WebSocket server instance

  afterInit() {
    this.logger.log("Initialized"); // Log message when the gateway is initialized
  }

  async handleConnection(socket: Socket) {
    // Handle new WebSocket connection

    const userId = socket.handshake.auth.token; // Extract userId from the WebSocket handshake

    // TO DO: Process the userId from the token
    // TO PRODUCTION: Fetch all chats (chatId) for the user from the database
    // const userChats = await this.chatService.findChatsByUser(userId);

    // IN DEV: Mock data for user chats (replace with real data fetching in production)
    const userChats = [{ id: "1" }, { id: "3" }, { id: "5" }];

    // Join the user to specific chat rooms based on chatIds
    userChats.forEach(chat => {
      socket.join(chat.id); // Join each chat room
    });

    this.logger.log(`Client id: ${socket.id} connected`); // Log connection
  }

  handleDisconnect(socket: Socket) {
    // Handle WebSocket disconnection
    this.logger.log(`Client id: ${socket.id} disconnected`); // Log disconnection
  }

  @SubscribeMessage("message")
  handleMessage(socket: Socket, data: any) {
    // Handle incoming messages with "message" event
    this.io.to(data[1]).emit("receiveMessage", {
      "message": data[0],
      "chatId": data[1]
    }); // Emit message to the specified chat room
  }

  @SubscribeMessage("receiveMessage")
  handleReceive(client: any, data: any) {
    // Handle incoming messages with "receiveMessage" event
    console.log("Received message:", data); // Log received message (for debugging purposes)
  }
}
