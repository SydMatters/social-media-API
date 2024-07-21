import { Module, forwardRef } from '@nestjs/common'; // Import Module decorator and forwardRef utility from NestJS
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule from NestJS
import { PassportModule } from '@nestjs/passport'; // Import PassportModule from NestJS
import { AuthService } from './services/auth.service'; // Import AuthService
import { AuthController } from './controllers/auth.controllers'; // Import AuthController
import { UsersModule } from '../users/user.module'; // Import UsersModule
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService from NestJS config package
import { JwtAuthGuard } from './guards/jwt.guard'; // Import JwtAuthGuard

@Module({
  imports: [
    ConfigModule.forRoot(), // Initialize ConfigModule with default options
    ConfigModule, // Import ConfigModule to make configuration available
    forwardRef(() => UsersModule), // Use forwardRef for circular dependencies with UsersModule
    PassportModule, // Import PassportModule for authentication
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for asynchronous registration
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'), // Use AUTH_SECRET from config
        signOptions: { expiresIn: '60m' }, // Set token expiration time to 60 minutes
      }),
    }),
  ],
  controllers: [AuthController], // Register AuthController
  providers: [AuthService, JwtAuthGuard], // Register AuthService and JwtAuthGuard as providers
  exports: [AuthService, JwtAuthGuard, JwtModule], // Export AuthService, JwtAuthGuard, and JwtModule for use in other modules
})
export class AuthModule {} // Export the class AuthModule
