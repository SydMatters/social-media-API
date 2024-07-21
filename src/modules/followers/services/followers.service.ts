import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFollowerDto } from '../dto/create-follower.dto';
import { FollowersEntity } from '../entities/followers.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(FollowersEntity)
    private readonly followerRepository: Repository<FollowersEntity>
  ) { }

  // Function to create a new follower
  async createFollower(createFollowerDto: CreateFollowerDto): Promise<FollowersEntity> {
    try {
      // Check if the DTO is provided
      if (!createFollowerDto) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }

      // Create a new follower entity
      const follower = this.followerRepository.create(createFollowerDto);

      // Check if the follower entity was created
      if (!follower) {
        throw new Error('Follower not created error from createFollower');
      }

      // Save the new follower to the database
      return await this.followerRepository.save(follower);
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to find all followings by follower ID
  async findFollowingsById(followerId: FollowersEntity['followerId']): Promise<String[]> {
    try {
      // Check if the followerId is provided
      if (!followerId) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }

      // Find all followings for the given followerId
      const followings = await this.followerRepository.find({ where: { followerId: followerId } });

      // Check if followings were found
      if (!followings || followings.length === 0) {
        throw new Error('No followings found for the provided followerId');
      }

      // Return an array of following IDs
      const result = followings.map(following => following.followingId);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to find followers by user ID
  async findFollowersByUser(followingID: FollowersEntity['followingId']): Promise<String[]> {
    try {
      // Check if the followingID is provided
      if (!followingID) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }

      // Find all followers for the given followingID
      const followers = await this.followerRepository.find({ where: { followingId: followingID } });

      // Check if followers were found
      if (!followers) {
        throw new Error('No followers found for the provided userId');
      }

      // Return an array of follower IDs
      const result = followers.map(follower => follower.followerId);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Function to delete a follower by ID
  async deleteFollower(followerId: string): Promise<string> {
    try {
      // Check if the followerId is provided
      if (!followerId) {
        throw new HttpErrorByCode[400]('please provide all fields');
      }

      // Find the follower by ID
      const follower = await this.followerRepository.findOneBy({ id: followerId });

      // Check if the follower was found
      if (!follower) {
        throw new Error('Follower not found');
      }

      // Delete the follower from the database
      const deleted = await this.followerRepository.remove(follower);

      // Check if the follower was deleted
      if (!deleted) {
        throw new Error('Follower not deleted');
      }

      // Return a success message
      return 'Follower deleted';
    } catch (err) {
      throw new Error(err);
    }
  }
}
