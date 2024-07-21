import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

// Define the LikeEntity class and map it to the 'likes' table in the database
@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid') // Primary key column with UUID type
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Column for storing the creation date of the like
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    cascade: true, // Enable cascade operations (insert, update, delete)
    onDelete: 'CASCADE', // Delete likes when the associated user is deleted
  })
  @JoinColumn({ name: 'userId' }) // Specify the column name in the database
  userId: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.postId, {
    cascade: true, // Enable cascade operations (insert, update, delete)
    onDelete: 'CASCADE', // Delete likes when the associated post is deleted
  })
  @JoinColumn({ name: 'postId' }) // Specify the column name in the database
  postId: PostEntity;
}
