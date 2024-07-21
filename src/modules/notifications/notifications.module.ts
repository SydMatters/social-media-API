import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controllers';
import { NotificationEntity } from './entities/notification.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/user.module'; 
import { UserEntity } from '../users/entities/user.entity'; 

@Module({
  imports: [
    // Import TypeORM modules for NotificationEntity and UserEntity
    TypeOrmModule.forFeature([NotificationEntity, UserEntity]), 
    AuthModule, // Import authentication module
    UsersModule, // Import users module
  ],
  controllers: [NotificationsController], // Register NotificationsController
  providers: [NotificationsService], // Register NotificationsService
  exports: [NotificationsService], // Export NotificationsService for use in other modules
})
export class NotificationsModule {}
