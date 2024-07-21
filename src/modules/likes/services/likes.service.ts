import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  // Function to find all likes
  findAllLikes(): Promise<LikeEntity[]> {
    try {
      // Find and return all like entities
      const likes = this.likeRepository.find();
      if (!likes) {
        // Throw an error if no likes are found
        throw new Error('Likes not found');
      }
      return likes;
    } catch (error) {
      // Throw an error if the find operation fails
      throw new Error(error);
    }
  }

  // Function to delete a like by ID
  deleteLike(likeId: string): Promise<void> {
    try {
      // Delete the like entity by its ID
      const like = this.likeRepository.delete(likeId).then(() => {
        return;
      });
      if (!like) {
        // Throw an error if the like to be deleted is not found
        throw new Error('Like not found');
      }
      return like;
    } catch (error) {
      // Throw an error if the delete operation fails
      throw new Error(error);
    }
  }

  // Function to find likes by post ID
  findLikesByPost(postId: string): Promise<LikeEntity[]> {
    try {
      // Find and return likes associated with a specific post ID
      const like = this.likeRepository.find({ where: { postId: postId } });
      if (!like) {
        // Throw an error if no likes are found for the given post ID
        throw new Error('Like not found');
      }
      return like;
    } catch (error) {
      // Throw an error if the find operation fails
      throw new Error(error);
    }
  }

  // Function to find likes by user ID
  findLikesByUser(userId: string): Promise<LikeEntity[]> {
    try {
      // Find and return likes associated with a specific user ID
      const userLikes = this.likeRepository.find({ where: { userId: userId } });
      if (!userLikes) {
        // Throw an error if no likes are found for the given user ID
        throw new Error('Likes not found');
      }
      return userLikes;
    } catch (error) {
      // Throw an error if the find operation fails
      throw new Error(error);
    }
  }
}
