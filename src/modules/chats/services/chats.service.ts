import { Injectable } from '@nestjs/common'; // Import Injectable decorator from NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository decorator from TypeORM
import { Repository } from 'typeorm'; // Import Repository from TypeORM
import { CreateChatDto } from '../dto/create-chat.dto'; // Import CreateChatDto
import { ChatEntity } from '../entities/chat.entity'; // Import ChatEntity

@Injectable() // Marks this class as a provider that can be injected into other parts of the application
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) { }

  // Function to create a new chat
  async createChat(createChatDto: CreateChatDto): Promise<ChatEntity> {
    try {
      if (!createChatDto) {
        throw new Error('Chat not created, please complete the form');
      } // Check if createChatDto is provided
      const chat = this.chatRepository.create(createChatDto); // Create a new chat entity from the DTO
      if (!chat) throw new Error('Chat not created'); // Check if chat creation was successful
      return await this.chatRepository.save(chat); // Save the new chat entity to the database
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  }

  // Function to find a chat by ID
  async findChatById(chatId: string): Promise<ChatEntity> {
    try {
      if (!chatId) throw new Error('Chat not found'); // Check if chatId is provided
      const chat = await this.chatRepository.findOneBy({ chatId }); // Find the chat entity by ID
      if (!chat) throw new Error('Chat not found'); // Check if the chat was found
      return chat; // Return the found chat entity
    } catch (error) {
      throw error; // Throw the error to be handled by the caller
    }
  }

  // Function to delete a chat by ID
  async deleteChat(chatId: string): Promise<void> {
    try {
      const result = await this.chatRepository.delete(chatId); // Delete the chat entity by ID
      if (!result.affected) {
        throw new Error('Chat not found'); // Check if the chat was deleted
      }
    } catch (error) {
      throw new Error('Chat not found'); // Throw an error if the chat was not found
    }
  }

  // Function to find all chats by a specific user
  async findChatsByUser(userId: string): Promise<ChatEntity[]> {
    try {
      const chats = await this.chatRepository.find({
        where: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      }); // Find all chat entities where the user is either user1 or user2
      if (!chats.length) {
        throw new Error('Chat not found'); // Check if any chats were found
      }
      return chats; // Return the found chat entities
    } catch (error) {
      throw new Error('Chat not found'); // Throw an error if no chats were found
    }
  }
}
