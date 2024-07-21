import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'; // Import necessary classes and decorators from NestJS
import { JwtService } from '@nestjs/jwt'; // Import the JwtService from NestJS

@Injectable() // Marks this class as a provider that can be injected into other parts of the application
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {} // Injects the JwtService

  // Method to determine if the request can be activated
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Gets the request object from the execution context
    const authHeader = request.headers.authorization; // Extracts the authorization header

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing'); // Throws an exception if the authorization header is missing
    }

    const token = authHeader.split(' ')[1]; // Extracts the token from the authorization header

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_SECRET,
      }); // Verifies the token using the JwtService and a secret from environment variables

      request.user = user; // Attaches the user information to the request object
      return true; // Returns true to allow the request to proceed
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token'); // Throws an exception if the token is invalid or expired
    }
  }
}
