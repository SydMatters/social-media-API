import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controllers';
import { LikeEntity } from './entities/like.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  // Import necessary modules
  imports: [
    // Import TypeOrmModule with the LikeEntity for database operations
    TypeOrmModule.forFeature([LikeEntity]),
    // Import AuthModule for authentication
    AuthModule,
  ],
  // Register the LikesController for handling HTTP requests related to likes
  controllers: [LikesController],
  // Provide the LikesService to handle business logic related to likes
  providers: [LikesService],
  // Export the LikesService to make it available for use in other modules
  exports: [LikesService],
})
export class LikesModule {}
