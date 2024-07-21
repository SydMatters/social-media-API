import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags("User")
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @ApiResponse({
    status: 201,
    description: 'User added.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Post('/register')
  async createUser(@Body() UserDto: UserDto): Promise<UserEntity | Error> {
    return this.userService.createUser(UserDto);
  }

@ApiResponse({
    status: 200,
    description: 'Get all Users.',
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
    description: 'Users not found.'
})
  @Get('/users')
  getUsers(): Promise<UserEntity[]> {
    try {
      return this.userService.getUsers();
    } catch (error) {
      console.error(error)
      throw new Error
    }
  }

@ApiResponse({
    status: 200,
    description: 'Get user by id.',
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
    description: 'User not found.'
})
  @Get('/by-id/:id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

@ApiResponse({
    status: 200,
    description: 'Get all User.',
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
    description: 'User not found.'
})
  @Get('/by-username/:username')
  @UseGuards(JwtAuthGuard)
  getUserByUserName(@Param('username') username: string): Promise<UserEntity> {
    return this.userService.getUserByUserName(username);
  }


  @ApiResponse({
    status: 201,
    description: 'Set Dark mode.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Post('/setDarkMode/:id')
  @UseGuards(JwtAuthGuard)
async modifyDarkMode(@Param('id') userId: string): Promise<void> {
  return await this.userService.setDarkMode(userId);
}

@ApiResponse({
    status: 200,
    description: 'User modify.',
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
    description: 'User not found.'
})  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async modifyUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    return await this.userService.editProfile(userId, userDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User deleted.',
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
    description: 'User not found.'
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') userId: string): Promise<string> {
    await this.userService.deleteUser(userId);
    return "Usuario eliminado exitosamente";
  }
}