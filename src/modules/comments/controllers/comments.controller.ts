import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards
} from '@nestjs/common'; // Import NestJS decorators and guards
import { CommentsService } from '../services/comments.service'; // Import the CommentsService
import { CreateCommentDTO } from '../dto/create-comment.dto'; // Import DTO for creating comments
import { CommentsEntity } from '../entities/comment.entity'; // Import Comment entity
import { ApiResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators for API documentation
import { JwtAuthGuard } from '../../auth/guards/jwt.guard'; // Import JWT authentication guard

@ApiTags('Comments') // Swagger tag to group comments-related endpoints
@Controller('comments') // Base route for this controller
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {} // Inject CommentsService

  @ApiResponse({
    status: 201,
    description: 'Comment successfully created.', // Response when a comment is created
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid data.' // Response for bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.' // Response for unauthorized access
  })
  @Post() // Route for creating a new comment
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication guard
  async createComment(
    @Body() createCommentDTO: CreateCommentDTO, // Receive comment data from request body
  ): Promise<CommentsEntity> {
    return this.commentsService.createComment(createCommentDTO); // Delegate creation to the service
  }

  @ApiResponse({
    status: 200,
    description: 'Comment successfully deleted.', // Response when a comment is deleted
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid data.' // Response for bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.' // Response when the comment to delete is not found
  })
  @Delete(':id') // Route for deleting a comment by ID
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication guard
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.commentsService.deleteComment(id); // Delegate deletion to the service
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved comments.', // Response when comments are retrieved
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid data.' // Response for bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comments not found.' // Response when no comments are found
  })
  @Get(':id') // Route for retrieving comments by ID
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication guard
  async getCommentById(@Param('id') id: string): Promise<CommentsEntity[]> {
    return this.commentsService.getCommentsbyId(id); // Delegate retrieval to the service
  }

  @ApiResponse({
    status: 200,
    description: 'Comment successfully updated.', // Response when a comment is updated
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid data.' // Response for bad request
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.' // Response for unauthorized access
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.' // Response when the comment to update is not found
  })
  @Patch(':id') // Route for updating a comment by ID
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication guard
  async updateComment(
    @Param('id') id: string, // Receive comment ID from route parameter
    @Body() updateData: Partial<CreateCommentDTO>, // Receive update data from request body
  ): Promise<CommentsEntity> {
    return this.commentsService.updateComment(id, updateData); // Delegate update to the service
  }
}
