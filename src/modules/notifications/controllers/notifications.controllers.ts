import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // create a notification
  @Post()
  public async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createNotification(createNotificationDto);
  }

  //delete a notification by the notification id
  @Delete(':id')
  public async deleteNotification(@Param('id') notificationId: string): Promise<void> {
    return await this.notificationsService.deleteNotification(notificationId);
  }
  // find a notification by the user id
  @Get('user/:userId')
  public async findNotificationsByUser(
    @Param('userId') userId: UserEntity,
  ): Promise<void> {
    return await this.notificationsService.findNotificationsByUser(userId);
  }
}
