// src/modules/likes/controllers/likes.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LikesService } from '../services/likes.services';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeEntity } from '../entities/like.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Likes")
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    status: 201,
    description: 'Like added.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
   @Post('create')
  createLike(@Body() createLikeDto: CreateLikeDto): Promise<LikeEntity> { 
    return this.likesService.createLike(createLikeDto);
   } 

   @ApiResponse({
    status: 200,
    description: 'Get all likes.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.'
  })
  @Get('all')
  findAllLikes(): Promise<LikeEntity[]> {
    return this.likesService.findAllLikes();
  }

  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el like.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 404,
    description: 'Like not found.'
  })
  @Delete(':id')
  deleteLike(@Param('id') likeId: string): Promise<void> {
    return this.likesService.deleteLike(likeId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get likes by post.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.'
  })
  @Get('post/:postId')
  findLikesByPost(@Param('postId') postId: PostEntity): Promise<LikeEntity[]> {
    return this.likesService.findLikesByPost(postId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get likes by user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 404,
    description: 'Likes not found.'
  })
  @Get('user/:userId')
  findLikesByUser(@Param('userId') userId: UserEntity): Promise<LikeEntity[]> {
    return this.likesService.findLikesByUser(userId);
  }
}
