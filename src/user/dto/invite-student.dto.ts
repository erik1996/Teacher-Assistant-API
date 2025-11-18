import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class InviteStudentDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @MaxLength(255, { message: 'First name cannot exceed 255 characters' })
  firstName?: string;

  @IsString()
  @MaxLength(255, { message: 'Last name cannot exceed 255 characters' })
  lastName?: string;

  @IsNotEmpty({ message: 'Group ID is required' })
  @IsNumber({}, { message: 'Group ID must be a number' })
  @Transform(({ value }) => parseInt(value as string))
  group_id: number;
}
