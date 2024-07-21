import { IsNotEmpty, IsString, IsBoolean, IsEnum, IsDateString, IsUUID } from 'class-validator'; // Validation decorators
import { NotificationAction } from '../entities/notification.entity'; // Import NotificationAction enum
import { ApiProperty } from '@nestjs/swagger'; // Swagger decorators for API documentation

export class CreateNotificationDto {
  
  @ApiProperty()
  @IsNotEmpty() // Ensure field is not empty
  @IsUUID() // Validate as a UUID
  emisorUser: string; // ID of the user sending the notification

  @ApiProperty()
  @IsNotEmpty() // Ensure field is not empty
  @IsUUID() // Validate as a UUID
  receptorUser: string; // ID of the user receiving the notification

  @ApiProperty()
  @IsBoolean() // Validate as a boolean
  status: boolean; // Status of the notification (e.g., read/unread)

  @ApiProperty()
  @IsNotEmpty() // Ensure field is not empty
  @IsEnum(NotificationAction) // Validate as a value of NotificationAction enum
  action: NotificationAction; // Action type of the notification

  @ApiProperty()
  @IsNotEmpty() // Ensure field is not empty
  @IsString() // Validate as a string
  title: string; // Title of the notification

  @ApiProperty()
  @IsNotEmpty() // Ensure field is not empty
  @IsString() // Validate as a string
  description: string; // Description of the notification

  @ApiProperty()
  @IsDateString() // Validate as a date string
  lastLogoutDate: string; // Date of the user's last logout
}
