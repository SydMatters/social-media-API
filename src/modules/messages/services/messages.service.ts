import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  // Function to create a new message
  createMessage(createMessageDto: DeepPartial<CreateMessageDto>) {
    try {
      if (!createMessageDto) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // Throw exception if DTO is not provided
      }
      const message = this.messageRepository.create(createMessageDto); // Create a new message instance
      return this.messageRepository.save(message); // Save the message to the database
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); // Throw exception if there is an error
    }
  }

  // Function to find messages by user
  async findMessagesByUser(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // Throw exception if userId is not provided
      }
      await this.messageRepository.find({ where: [{ id: userId }] }); // Find messages by userId
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); // Throw exception if there is an error
    }
  }

  // Function to find messages by chat
  async findMessagesByChat(chatId: string): Promise<void> {
    try {
      if (!chatId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // Throw exception if chatId is not provided
      }
      await this.messageRepository.find({ where: [{ chatId: chatId }] }); // Find messages by chatId
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); // Throw exception if there is an error
    }
  }

  // Function to delete a message by ID
  async deleteMessage(messageId: string): Promise<void> {
    try {
      if (!messageId) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND); // Throw exception if messageId is not provided
      }
      await this.messageRepository.delete(messageId); // Delete the message by ID
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); // Throw exception if there is an error
    }
  }
}
