import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'; // Import necessary decorators and classes from NestJS
import { ChatService } from '../services/chats.service'; // Import ChatService
import { CreateChatDto } from '../dto/create-chat.dto'; // Import CreateChatDto
import { ChatEntity } from '../entities/chat.entity'; // Import ChatEntity
import { ApiResponse } from '@nestjs/swagger'; // Import ApiResponse decorator for Swagger documentation

@Controller('chat') // Define the base route for the controller
export class ChatController {
  constructor(private readonly chatService: ChatService) {} // Inject ChatService

  // Route to create a new chat
  @ApiResponse({
    status: 201,
    description: 'Chat created.', // Successful creation of a chat
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Invalid input data
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Authentication failure
  })
  @Post() // HTTP POST request
  createChat(@Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
    // Call the service method to create a new chat and return the result
    return this.chatService.createChat(createChatDto);
  }

  // Route to get a chat by its ID
  @ApiResponse({
    status: 200,
    description: 'Get chat by ID.', // Successfully retrieved chat
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Invalid input data
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Authentication failure
  })
  @Get(':id') // HTTP GET request with path parameter
  findChatById(@Param('id') chatId: string): Promise<ChatEntity> {
    // Call the service method to find a chat by its ID and return the result
    return this.chatService.findChatById(chatId);
  }

  // Route to delete a chat by its ID
  @ApiResponse({
    status: 200,
    description: 'Chat deleted.', // Successfully deleted chat
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Invalid input data
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Authentication failure
  })
  @Delete(':id') // HTTP DELETE request with path parameter
  deleteChat(@Param('id') chatId: string): Promise<void> {
    // Call the service method to delete a chat by its ID
    this.chatService.deleteChat(chatId);
    return; // No content to return
  }

  // Route to get all chats for a specific user
  @ApiResponse({
    status: 200,
    description: 'Get all chats by user.', // Successfully retrieved chats
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.' // Invalid input data
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized' // Authentication failure
  })
  @Get('user/:userId') // HTTP GET request with path parameter
  findChatsByUser(@Param('userId') userId: string): Promise<ChatEntity[]> {
    // Call the service method to find all chats for the given user ID and return the result
    return this.chatService.findChatsByUser(userId);
  }
}
