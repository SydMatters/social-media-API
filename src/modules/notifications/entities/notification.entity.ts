import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'; // TypeORM decorators
import { UserEntity } from '../../users/entities/user.entity'; // Import UserEntity for relations

// Enum for possible notification actions
export enum NotificationAction {
  MESSAGES = 'messages',
  LIKES = 'likes',
  COMMENTS = 'comments',
  NEW_FOLLOW_REQUEST = 'new_follow_request',
  FOLLOW_REQUEST_ACCEPTED = 'follow_request_accepted',
}

@Entity('notifications') // Define the table name in the database
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid') // Primary key, auto-generated UUID
  id: string;
  
  @Column({ type: 'boolean', default: false }) // Status of the notification (e.g., read/unread)
  status: boolean;

  @Column({ type: 'enum', enum: NotificationAction, nullable: false }) // Action associated with the notification
  action: NotificationAction;
  
  @Column({ type: 'varchar', length: 100, nullable: false }) // Title of the notification
  title: string;
  
  @Column({ type: 'varchar', length: 100, nullable: false }) // Description of the notification
  description: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Timestamp of when the notification was created
  notificationDate: Date;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Relation to the receptor user
  receptorUser: UserEntity;
  
  @ManyToOne(() => UserEntity, (user) => user.userId, { cascade: true, onDelete: 'CASCADE' }) // Relation to the emisor user
  emisorUser: UserEntity;
}
