import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ description: "User's first name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "User's surname" })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ description: "User's email address" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's role name" })
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @ApiProperty({
    description: "User's password",
    minLength: 8,
    pattern:
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$',
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}

export class CheckUserDto {
  @ApiProperty({ description: "User's email address" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
