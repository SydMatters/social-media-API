import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator for Swagger documentation
import { IsString, IsNotEmpty } from 'class-validator'; // Import validation decorators

export class CreateCommentDTO {
  
  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the userId field is not empty
  @IsString() // Validates that the userId field is a string
  userId: string; // The ID of the user who is creating the comment

  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the postId field is not empty
  @IsString() // Validates that the postId field is a string
  postId: string; // The ID of the post to which the comment is being added

  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the content field is not empty
  @IsString() // Validates that the content field is a string
  content: string; // The content of the comment
}
