import {
  IsString,
  IsDate,
  IsNotEmpty
} from 'class-validator'; // Import validation decorators from class-validator
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator for Swagger documentation

export class CreateChatDto {

    @ApiProperty() // Documents this property in Swagger
    @IsString() // Validate that user1Id is a string
    @IsNotEmpty() // Ensure user1Id is not empty
    user1Id: string; // User ID of the first user

    @ApiProperty() // Documents this property in Swagger
    @IsString() // Validate that user2Id is a string
    @IsNotEmpty() // Ensure user2Id is not empty
    user2Id: string; // User ID of the second user

    @ApiProperty() // Documents this property in Swagger
    @IsDate() // Validate that lastMessage is a date
    lastMessage?: Date; // Timestamp of the last message, optional
}
