
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiHeader({
    name: 'Token',
    description: 'Token de autenticación',
    required: false
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Datos no válidos.',
  })
  
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      email,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}