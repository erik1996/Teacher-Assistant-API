import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserStatus } from '../../db/entities/user.entity';

export class GetStudentsDto {
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value as string) : undefined))
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value as string) : undefined))
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value as string) : undefined))
  @IsNumber({}, { message: 'Group ID must be a number' })
  group_id?: number;

  @IsOptional()
  @IsEnum(['invited', 'registered', 'active', 'suspended', 'deleted'], {
    message:
      'Status must be one of: invited, registered, active, suspended, deleted',
  })
  status?: UserStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  is_active?: boolean;
}
