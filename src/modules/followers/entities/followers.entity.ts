import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

// Define the FollowersEntity class and map it to the 'Followers' table in the database
@Entity('Followers')
export class FollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Primary key with UUID type

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  followDate: Date; // Date when the follow occurred

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followerId' })
  follower: UserEntity; // User who is following

  @Column()
  followerId: string; // ID of the user who is following

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'followingId' })
  following: UserEntity; // User who is being followed

  @Column()
  followingId: string; // ID of the user being followed
}
