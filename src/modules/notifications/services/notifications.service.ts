import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>, // Inject Notification repository
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // Inject User repository
  ) {}

  // Function to create a new notification
  async createNotification(createNotificationDto: CreateNotificationDto) {
    try {
      const { emisorUser, receptorUser, ...rest } = createNotificationDto;

      // Find emisor user
      const emisor = await this.userRepository.findOne({ where: { userId: emisorUser } });
      if (!emisor) {
        throw new HttpException('Emisor user not found', HttpStatus.NOT_FOUND);
      }

      // Find receptor user
      const receptor = await this.userRepository.findOne({ where: { userId: receptorUser } });
      if (!receptor) {
        throw new HttpException('Receptor user not found', HttpStatus.NOT_FOUND);
      }

      // Create the notification
      const notification = this.notificationRepository.create({
        emisorUser: emisor,
        receptorUser: receptor,
        ...rest,
      });

      // Save the notification in the database
      return await this.notificationRepository.save(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to delete a notification by ID
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      if (!notificationId) {
        throw new HttpException('Notification ID not provided', HttpStatus.BAD_REQUEST);
      }
      const result = await this.notificationRepository.delete(notificationId);
      if (result.affected === 0) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Function to find notifications by user ID
  async findNotificationsByUser(userId: string): Promise<NotificationEntity[]> {
    try {
      if (!userId) {
        throw new HttpException('User ID not provided', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userRepository.findOne({ where: { userId: userId } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return await this.notificationRepository.find({ where: { receptorUser: user } });
    } catch (error) {
      console.error('Error finding notifications:', error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
