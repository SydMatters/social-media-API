import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'; // if need more entity you can add here 
import { UserEntity } from '../../users/entities/user.entity';
import { ChatEntity } from '../../chats/entities/chat.entity';

@Entity('messages')
export class MessageEntity {
  
  @PrimaryGeneratedColumn('uuid')
  // Unique identifier for the message
  id: string;
  
  @Column({ type: 'text' })
  // Content of the message
  messageContent?: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  // URL or path to the media associated with the message (optional)
  media?: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // Timestamp when the message was created
  creationTime: Date;
  
  @ManyToOne(() => UserEntity, user => user.userId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  // User who sent the message
  user: string;
  
  @ManyToOne(() => ChatEntity, chat => chat.chatId, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  // Chat to which the message belongs
  chatId: string;
}
