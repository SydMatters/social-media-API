import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {

  @ApiProperty() // Swagger documentation property for the postId field
  @IsString() // Validates that postId is a string
  @IsNotEmpty() // Validates that postId is not empty
  postId: string;

  @ApiProperty() // Swagger documentation property for the userId field
  @IsString() // Validates that userId is a string
  @IsNotEmpty() // Validates that userId is not empty
  userId: string;
}
