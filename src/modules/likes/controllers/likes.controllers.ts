import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Likes') // Tags for Swagger UI documentation
@Controller('likes') // Route prefix for all endpoints in this controller
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all likes.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('all') // Endpoint to get all likes
  @UseGuards(JwtAuthGuard) // Guard to ensure the user is authenticated
  findAllLikes(): Promise<LikeEntity[]> {
    return this.likesService.findAllLikes(); // Calls service method to get all likes
  }

  @ApiResponse({
    status: 200,
    description: 'Get likes by post.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('/post/:postId') // Endpoint to get likes by post ID
  @UseGuards(JwtAuthGuard) // Guard to ensure the user is authenticated
  findLikesByPost(@Param('postId') postId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId); // Calls service method to get likes for a specific post
  }

  @ApiResponse({
    status: 200,
    description: 'Get likes by user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.',
  })
  @Get('/user/:userId') // Endpoint to get likes by user ID
  @UseGuards(JwtAuthGuard) // Guard to ensure the user is authenticated
  findLikesByUser(@Param('userId') userId: string): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId); // Calls service method to get likes for a specific user
  }
}
