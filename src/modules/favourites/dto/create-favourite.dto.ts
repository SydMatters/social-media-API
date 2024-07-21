import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FavouritesDto {

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that userId is a string
  @IsNotEmpty() // Ensures that userId is not empty
  userId: string;

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that postId is a string
  @IsNotEmpty() // Ensures that postId is not empty
  postId: string;

  @ApiProperty() // Documents this property in Swagger
  @IsDate() // Ensures that creationDate is a valid date
  @IsNotEmpty() // Ensures that creationDate is not empty
  creationDate?: Date; // Optional property for the date the favorite was created
}
