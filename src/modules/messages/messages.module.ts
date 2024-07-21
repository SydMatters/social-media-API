import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './services/messages.service'; // Import MessagesService
import { MessagesController } from './controllers/messages.controller'; // Import MessagesController
import { MessageEntity } from './entities/message.entity'; // Import MessageEntity
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]), // Register MessageEntity with TypeOrm
    AuthModule, // Import AuthModule for authentication
  ],
  controllers: [MessagesController], // Register MessagesController
  providers: [MessagesService], // Register MessagesService
  exports: [MessagesService], // Export MessagesService for use in other modules
})
export class MessagesModule {}
