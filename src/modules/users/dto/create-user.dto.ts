// here you must tyo create the user dto

import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { Gender } from '../entities/user.entity';

export class UserDto extends PartialType(UserEntity) {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNumber()
  @IsPositive()
  age?: number;

  @IsEnum(Gender)
  gender?: Gender;

  @IsString()
  profileImage?: string;

  @IsString()
  coverImage?: string;

  @IsString()
  description?: string;

  @IsString()
  college?: string;

  @IsString()
  workPlace?: string;

  @IsString()
  location?: string;

  @IsString()
  personalWebSite?: string;
}