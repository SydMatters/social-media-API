import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateFollowerDto {
  @ApiProperty() // Documents this property in Swagger
  @IsString() // Validates that the followerId field is a string
  @IsNotEmpty() // Validates that the followerId field is not empty
  followerId: string; // ID of the follower

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Validates that the followingId field is a string
  @IsNotEmpty() // Validates that the followingId field is not empty
  followingId: string; // ID of the user being followed

  @ApiProperty() // Documents this property in Swagger
  @IsDate() // Validates that the followersDate field is a Date
  @IsOptional() // Validates that the followDate field is optional
  followDate?: Date; // Optional date when the follow occurred
}
