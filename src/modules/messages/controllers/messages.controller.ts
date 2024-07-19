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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiResponse({
    status: 201,
    description: 'Message created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Post()
  public async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    return await this.messagesService.createMessage(createMessageDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get message.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat not found.',
  })
  @Get(':chatId')
  public async findMessagesByChat(
    @Param('chatId') chatId: string,
  ): Promise<void> {
    return await this.messagesService.findMessagesByChat(chatId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get Message.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Message not found.',
  })
  @Get(':userId')
  public async findMessagesByUser(
    @Param('userId') userId: string,
  ): Promise<void> {
    return await this.messagesService.findMessagesByUser(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Message deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Delete(':id')
  public async deleteMessage(@Param('id') messageId: string): Promise<void> {
    return await this.messagesService.deleteMessage(messageId);
  }
}
