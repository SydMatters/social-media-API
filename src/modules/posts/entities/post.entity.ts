import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { LikeEntity } from '../../likes/entities/like.entity';
import { FavouritesEntity } from '../../favourites/entities/favourites.entity';
import { CommentsEntity } from '../../comments/entities/comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  media: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  publicationDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updateDate: Date;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: string;

  /* @OneToMany(() => LikeEntity, (like) => like.post)
  likesPost: LikeEntity[]; */

  @OneToMany(() => FavouritesEntity, (favourites) => favourites.postId)
  favourites: FavouritesEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.postId)
  comments: CommentsEntity[];
}