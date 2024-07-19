import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @ApiResponse({
    status: 201,
    description: 'Notification created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Post()
  public async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    return await this.notificationsService.createNotification(
      createNotificationDto,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Notification deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Delete(':id')
  public async deleteNotification(
    @Param('id') notificationId: string,
  ): Promise<void> {
    return await this.notificationsService.deleteNotification(notificationId);
  }

  @ApiResponse({
    status: 200,
    description: 'Get notification.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found.',
  })
  @Get('user/:userId')
  public async findNotificationsByUser(
    @Param('userId') userId: UserEntity,
  ): Promise<void> {
    return await this.notificationsService.findNotificationsByUser(userId);
  }
}
