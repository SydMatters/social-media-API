import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // create a message
  @Post()
  public async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return await this.messagesService.createMessage(createMessageDto);
  }

  // find messages by chat id
  @Get(':chatId')
  public async findMessagesByChat(@Param('chatId') chatId: string): Promise<void> {
    return await this.messagesService.findMessagesByChat(chatId);
  }

  //find message by user id
  @Get(':userId')
  public async findMessagesByUser(@Param('userId') userId: string): Promise<void> {
    return await this.messagesService.findMessagesByUser(userId);
  }
  
  // delete a message by id
  @Delete(':id')
  public async deleteMessage(@Param('id') messageId: string): Promise<void> {
    return await this.messagesService.deleteMessage(messageId);
  }

}
