import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'; // Import necessary decorators and classes from TypeORM
import { UserEntity } from '../../users/entities/user.entity'; // Import UserEntity

@Entity('Chats') // Define the 'Chats' table
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid') // Primary key with UUID type
  chatId: string;

  @Column({ type: 'text' }) // Column for user1Id with text type
  user1Id: string;

  @Column({ type: 'text' }) // Column for user2Id with text type
  user2Id: string;

  @Column({ type: 'timestamp', nullable: true }) // Column for lastMessage with timestamp type, nullable
  lastMessage?: Date;

  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Many-to-one relationship with UserEntity, cascading operations and cascading deletes
  @JoinColumn({ name: 'user1Id' }) // Join column to establish the foreign key relationship with user1Id
  user1: UserEntity;

  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Many-to-one relationship with UserEntity, cascading operations and cascading deletes
  @JoinColumn({ name: 'user2Id' }) // Join column to establish the foreign key relationship with user2Id
  user2: UserEntity;
}
