import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string | undefined;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string | undefined;
}
