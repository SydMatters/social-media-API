import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service'; // Import NotificationsService
import { CreateNotificationDto } from '../dto/create-notification.dto'; // Import CreateNotificationDto
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard'; // Import JwtAuthGuard

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  // Create a notification
  @ApiResponse({
    status: 201,
    description: 'Notification sent.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto, // Data transfer object for creating a notification
  ) {
    return this.notificationsService.createNotification(createNotificationDto); // Call service method to create notification
  }

  // Delete a notification by ID
  @ApiResponse({
    status: 200,
    description: 'Notification deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found.',
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication
  deleteNotification(@Param('id') notificationId: string): Promise<void> {
    return this.notificationsService.deleteNotification(notificationId); // Call service method to delete notification
  }

  // Find notifications by user ID
  @ApiResponse({
    status: 200,
    description: 'Get all notifications.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Notifications not found.',
  })
  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard) // Protect route with JWT authentication
  async findNotificationsByUser(
    @Param('userId') userId: string, // User ID parameter
  ): Promise<void> {
    await this.notificationsService.findNotificationsByUser(userId); // Call service method to find notifications by user
  }
}
