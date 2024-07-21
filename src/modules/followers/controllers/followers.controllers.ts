import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FollowersService } from '../services/followers.service';
import { CreateFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags("Followers")
@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) { }

  @ApiResponse({
    status: 201,
    description: 'New follow.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createFollower(@Body() createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    // Create a new follower relationship
    return this.followersService.createFollower(createFollowerDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all users that I am following.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Followers not found.'
  })
  @Get('followings/:followerId')
  @UseGuards(JwtAuthGuard)
  findFollowingsById(@Param('followerId') followerId: string): Promise<String[]> {
    // Find all users that the specified user is following
    return this.followersService.findFollowingsById(followerId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all followers that follow me.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Followers not found.'
  })
  @Get('/user/:followingId')
  @UseGuards(JwtAuthGuard)
  findFollowersByUser(@Param('followingId') followingId: string): Promise<String[]> {
    // Find all users that follow the specified user
    return this.followersService.findFollowersByUser(followingId);
  }

  @ApiResponse({
    status: 200,
    description: 'Unfollow.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Follow not found.'
  })
  @Delete('/delete/:followerId')
  @UseGuards(JwtAuthGuard) 
  deleteFollower(@Param('followerId') followerId: string): Promise<String> {
    // Remove a follower relationship
    return this.followersService.deleteFollower(followerId);
  }
}
