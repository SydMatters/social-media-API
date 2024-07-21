import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

// Define the LikeEntity class and map it to the 'likes' table in the database
@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid') // Primary key column with UUID type
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Column for storing the creation date of the like
  creationDate: Date;
  
  @Column() // Column for storing the ID of the post that was liked
  postId: string;
  
  @Column() // Column for storing the ID of the user who liked the post
  userId: string;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Many-to-One relationship with UserEntity
  user: UserEntity;
  
  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' }) // Many-to-One relationship with PostEntity
  post: PostEntity;
}
