import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comment.entity';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { isString } from 'class-validator';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

  /**
   * Creates a new comment.
   * @param createCommentDTO - Data transfer object containing the comment details.
   * @returns The newly created comment.
   * @throws HttpException if the DTO is missing or if there's an issue saving the comment.
   */
  async createComment(
    createCommentDTO: CreateCommentDTO,
  ): Promise<CommentsEntity> {
    try {
      if (!createCommentDTO) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Create a new comment instance from the DTO
      const newComment = this.commentsRepository.create(createCommentDTO);
      // Save the new comment to the database
      return await this.commentsRepository.save(newComment);
    } catch (e) {
      // Handle errors and throw a Bad Request exception if something goes wrong
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a comment by ID.
   * @param id - The ID of the comment to delete.
   * @returns void
   * @throws HttpException if the comment is not found or if there's an issue deleting it.
   */
  async deleteComment(id: string): Promise<void> {
    try {
      // Attempt to delete the comment by ID
      const erased = this.commentsRepository.delete(id).then(() => { return });
      // Check if the delete operation was successful
      if (!erased) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return erased;
    } catch (e) {
      // Handle errors and throw a Bad Request exception if something goes wrong
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieves all comments for a given post ID.
   * @param postId - The ID of the post to retrieve comments for.
   * @returns An array of comments for the specified post.
   * @throws HttpException if the post ID is not a string or if there's an issue retrieving comments.
   */
  async getCommentsbyId(postId: string): Promise<CommentsEntity[]> {
    try {
      // Check if postId is a valid string
      if (!isString(postId)) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Find and return all comments associated with the given postId
      return await this.commentsRepository.find({ where: { postId } });
    } catch (e) {
      // Handle errors and throw a Bad Request exception if something goes wrong
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates an existing comment.
   * @param id - The ID of the comment to update.
   * @param updateData - The data to update the comment with.
   * @returns The updated comment.
   * @throws HttpException if the comment ID is not provided or if there's an issue updating the comment.
   */
  async updateComment(
    id: any,
    updateData: Partial<CommentsEntity>,
  ): Promise<CommentsEntity> {
    try {
      if (!id) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      // Update the comment with the given ID and data
      await this.commentsRepository.update(id, updateData);
      // Retrieve and return the updated comment
      return this.commentsRepository.findOne({ where: { id: id } });
    } catch (e) {
      // Handle errors and throw a Bad Request exception if something goes wrong
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
