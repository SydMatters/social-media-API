// src/modules/posts/controllers/posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

    // Documentation whit swagger the service posts
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({
       status: 200,
        type: CreatePostDto,
        description: 'Create a new post'
     })
     // now the respose error
     @ApiResponse({
      status: 400,
      type: CreatePostDto,
      description: 'BAD REQUEST: Create a new post'
    })
    @ApiResponse({
      status: 500,
      type: CreatePostDto,
      description: 'INTERNAL SERVER ERROR: Create a new post'
    })

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  // @Get(':id')
  // findPostById(@Param('id') postId: string): Promise<PostEntity> { ... }

  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Update a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Update a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Update a post'
  })
  // @Put(':id')
  updatePost(@Param('id') postId: string, @Body() updatePostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Delete a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Delete a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Delete a post'
  })
  // @Delete(':id')
  deletePost(@Param('id') postId: string): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Like a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Like a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Like a post'
  })
  // @Post(':id/like')
  likePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> {
    return this.postsService.likePost(postId, userId)
  }

  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: 'Unlike a post'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Unlike a post'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Unlike a post'
  })
  // @Post(':id/unlike')
  unlikePost(@Param('id') postId: string, @Body('userId') userId: string): Promise<void> {
    return this.postsService.unlikePost(postId, userId)
  }

  @ApiOperation({ summary: 'Find posts by user' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts by user'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts by user'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts by user'
  })
  // @Get('user/:userId')
  findPostsByUser(@Param('userId') userId: UserEntity): Promise<PostEntity[]> {
    return this.postsService.findPostsByUser(userId)
  }

  @ApiOperation({ summary: 'Find posts visible to user' })
  @ApiResponse({
    status: 200,
    type: [CreatePostDto],
    description: 'Find posts visible to user'
  })
  @ApiResponse({
    status: 400,
    type: CreatePostDto,
    description: 'BAD REQUEST: Find posts visible to user'
  })
  @ApiResponse({
    status: 500,
    type: CreatePostDto,
    description: 'INTERNAL SERVER ERROR: Find posts visible to user'
  })
  // @Get('user/:userId/visible')
  findPostsVisibleToUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findPostsVisibleToUser(userId)
  }
}
