import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"; // Import validation decorators from class-validator
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator from Swagger

// DTO for authentication
export class AuthDTO {
  
  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the email field is not empty
  @IsEmail() // Validates that the email field contains a valid email address
  email: string;

  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the password field is not empty
  @IsString() // Validates that the password field is a string
  @MinLength(8) // Validates that the password field has a minimum length of 8 characters
  password: string;
}

// DTO for logging out
export class LogoutDTO {
  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the date field is not empty
  date: string;

  @ApiProperty() // Documents this property in Swagger
  @IsNotEmpty() // Validates that the email field is not empty
  @IsEmail() // Validates that the email field contains a valid email address
  email: string;
}
