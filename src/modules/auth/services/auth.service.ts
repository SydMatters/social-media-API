import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  public async validateUser(email: string, password: string): Promise<UserEntity | null> {
    try {
      const userByEmail = await this.userService.getByEmail(email);

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password);
        if (match) return userByEmail;
      }

      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
    try {
      const getUser = await this.userService.getUserById(user.id);
      if (!getUser) {
        throw new UnauthorizedException('User not found');
      }

      const payload: jwt.JwtPayload = { id: getUser.id };

      return {
        accessToken: this.signJWT({
          payload,
          secret: "asjdjkashdjkashdjkha", // Usa una variable de entorno para el secreto
          expires: '1h',
        }),
        user: getUser,
      };
    } catch (error) {
      console.error('Error generating JWT:', error);
      throw new UnauthorizedException('Failed to generate JWT');
    }
  }
}
