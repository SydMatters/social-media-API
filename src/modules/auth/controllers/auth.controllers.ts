import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'; // Import decorators and exceptions from NestJS
import { AuthDTO, LogoutDTO } from '../dto/auth.dto'; // Import Data Transfer Objects (DTOs) for authentication
import { AuthService } from '../services/auth.service'; // Import the authentication service
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags("Auth") // Adds a tag to this controller in the Swagger documentation
@Controller() // Defines this class as a NestJS controller
export class AuthController {
  constructor(private readonly authService: AuthService) { } // Injects the authentication service

  @Post('login') // Defines an endpoint for POST requests to 'login'
  @ApiHeader({
    name: 'Token',
    description: 'Authentication token',
    required: false
  }) // Documents the 'Token' header for Swagger
  @ApiResponse({
    status: 200,
    description: 'Successful login.',
  }) // Documents the 200 response for Swagger
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  }) // Documents the 401 response for Swagger
  async login(@Body() { email, password }: AuthDTO) {
    // Destructures email and password from the request body, validated by AuthDTO
    const userValidate = await this.authService.validateUser(
      email,
      password,
    ); // Validates the user credentials using the AuthService
    if (!userValidate) {
      throw new UnauthorizedException('Invalid credentials');
    } // Throws an exception if the credentials are invalid
    const jwt = await this.authService.generateJWT(userValidate);
    // Generates a JWT if the user is valid

    return jwt; // Returns the generated JWT
  }

  @Post('logout') // Defines an endpoint for POST requests to 'logout'
  @ApiResponse({
    status: 200,
    description: 'Successful logout.',
  }) // Documents the 200 response for Swagger
  @ApiResponse({
    status: 401,
    description: 'Invalid date.',
  }) // Documents the 401 response for Swagger
  async logout(@Body() { date, email }: LogoutDTO) {
    // Destructures date and email from the request body, validated by LogoutDTO
    const userLogout = await this.authService.logout(
      date,
      email,
    ); // Logs out the user using the AuthService

    if (!userLogout) {
      throw new UnauthorizedException('Invalid date');
    } // Throws an exception if the logout data is invalid

    return userLogout; // Returns the result of the logout operation
  }
}
