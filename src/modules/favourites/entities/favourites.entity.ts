import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('Favourites')
export class FavouritesEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string; // Primary key, auto-generated UUID

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  creationDate: Date; // Automatically set to the current timestamp when the record is created

  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' })
  userId: string; // Foreign key to UserEntity

  @ManyToOne(() => PostEntity, (post) => post.postId, { cascade: true, onDelete: 'CASCADE' })
  postId: string; // Foreign key to PostEntity
}
