import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterTeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber?: string;

  @IsBoolean()
  termsAndConditions: boolean;

  @IsBoolean()
  @IsOptional()
  emailNotifications: boolean = false;
}
