import { Module } from '@nestjs/common'; // Import Module decorator from NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule from TypeORM
import { ChatService } from './services/chats.service'; // Import ChatService
import { ChatController } from './controllers/chats.controllers'; // Import ChatController
import { ChatEntity } from './entities/chat.entity'; // Import ChatEntity
import { MessageEntity } from '../messages/entities/message.entity'; // Import MessageEntity
import { ChatGateway } from './socket.gateway'; // Import ChatGateway for WebSocket communication

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])], // Register TypeORM entities ChatEntity and MessageEntity
  controllers: [ChatController], // Register ChatController
  providers: [ChatService, ChatGateway], // Register ChatService and ChatGateway as providers
  exports: [ChatService], // Export ChatService to make it available for other modules
})
export class ChatModule {}
