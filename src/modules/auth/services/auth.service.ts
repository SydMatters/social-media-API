import { Injectable, UnauthorizedException } from '@nestjs/common'; // Import necessary classes and decorators from NestJS
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing and comparison
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT handling
import { UserEntity } from 'src/modules/users/entities/user.entity'; // Import UserEntity
import { UserService } from 'src/modules/users/services/user.service'; // Import UserService

@Injectable() // Marks this class as a provider that can be injected into other parts of the application
export class AuthService {
  constructor(private readonly userService: UserService) { } // Injects the UserService

  // Function to validate a user's credentials
  public async validateUser(email: string, password: string): Promise<UserEntity | null> {
    try {
      const userByEmail = await this.userService.getByEmail(email); // Fetch user by email

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password); // Compare provided password with stored hashed password
        if (match) return userByEmail; // Return user if passwords match
      }
      return null; // Return null if user not found or passwords do not match
    } catch (error) {
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Invalid credentials'); // Throw an exception if validation fails
    }
  }

  // Function to sign a JWT
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires }); // Sign and return a JWT with the provided payload, secret, and expiration time
  }

  // Function to generate a JWT for a user
  public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
    try {
      const getUser = await this.userService.getUserById(user.userId); // Fetch user by ID
      if (!getUser) {
        throw new UnauthorizedException('User not found'); // Throw an exception if user not found
      }

      const payload: jwt.JwtPayload = { id: getUser.userId }; // Create JWT payload with user ID

      return {
        accessToken: this.signJWT({
          payload,
          secret: process.env.AUTH_SECRET, // Use secret from environment variables
          expires: '1h', // Set token expiration time to 1 hour
        }),
        user: getUser, // Return the user along with the access token
      };
    } catch (error) {
      console.error('Error generating JWT:', error);
      throw new UnauthorizedException('Failed to generate JWT'); // Throw an exception if JWT generation fails
    }
  }

  // Function to log out a user
  public async logout(date: string, email: string): Promise<UserEntity | null> {
    try {
      if (!date) {
        throw new UnauthorizedException('Invalid date'); // Throw an exception if date is not provided
      }
      const user = await this.userService.getByEmail(email); // Fetch user by email

      if (!user) {
        throw new UnauthorizedException('User not found'); // Throw an exception if user not found
      }

      return await this.userService.updateLastLogout(email, date); // Update user's last logout date and return the user
    } catch (error) {
      throw new UnauthorizedException('Failed to logout'); // Throw an exception if logout fails
    }
  }
}
