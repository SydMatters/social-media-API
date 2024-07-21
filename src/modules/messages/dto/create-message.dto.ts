// here you must to create a post dto
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator';

export class CreateMessageDto {

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that messageContent is a string
  @IsNotEmpty() // Ensures that messageContent is not empty
  messageContent: string;

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that media is a string
  media: string;

  @ApiProperty() // Documents this property in Swagger
  @IsDate() // Ensures that creationTime is a date
  creationTime: Date;

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that user is a string
  @IsNotEmpty() // Ensures that user is not empty
  user: string;

  @ApiProperty() // Documents this property in Swagger
  @IsString() // Ensures that chatID is a string
  @IsNotEmpty() // Ensures that chatId is not empty
  chatId: string;
}
