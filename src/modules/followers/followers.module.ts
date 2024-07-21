import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controllers';
import { FollowersEntity } from './entities/followers.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Import the TypeOrmModule for the FollowersEntity, enabling database operations
    TypeOrmModule.forFeature([FollowersEntity]),
    
    // Import the AuthModule for authentication-related functionalities
    AuthModule
  ],
  controllers: [
    // Register the FollowersController for handling HTTP requests
    FollowersController
  ],
  providers: [
    // Register the FollowersService for business logic related to followers
    FollowersService
  ],
  exports: [
    // Export the FollowersService and TypeOrmModule for use in other modules
    FollowersService,
    TypeOrmModule
  ],
})
export class FollowersModule {}
