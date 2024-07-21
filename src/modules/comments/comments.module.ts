import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { CommentsEntity } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  // Imports the TypeOrmModule to allow interaction with the CommentsEntity in the database
  imports: [
    TypeOrmModule.forFeature([CommentsEntity]), // Provides repository access for CommentsEntity
    AuthModule, // Imports the AuthModule to handle authentication-related features
  ],
  // Registers the CommentsController to handle incoming requests related to comments
  controllers: [CommentsController],
  // Provides the CommentsService to handle business logic and interact with the database
  providers: [CommentsService],
  // Exports the CommentsService so it can be used in other modules
  exports: [CommentsService],
})
export class CommentsModule {}
