import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity'; // Import UserEntity
import { PostEntity } from '../../posts/entities/post.entity'; // Import PostEntity

@Entity('comments') // Defines the table name in the database
export class CommentsEntity {
  
  @PrimaryGeneratedColumn('uuid') // Primary key column with UUID type
  id: string; // Unique identifier for the comment

  @Column({ type: 'varchar' }) // Column for storing the user ID
  userId: string; // ID of the user who made the comment

  @Column({ type: 'varchar' }) // Column for storing the post ID
  postId: string; // ID of the post to which the comment belongs

  @Column({ type: 'text' }) // Column for storing the content of the comment
  content: string; // The actual text of the comment

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Column for storing the timestamp of comment creation
  createdAt: Date; // Date and time when the comment was created

  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Defines a many-to-one relationship with UserEntity
  user: UserEntity; // The user who made the comment

  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' }) // Defines a many-to-one relationship with PostEntity
  post: PostEntity; // The post to which the comment belongs
}
