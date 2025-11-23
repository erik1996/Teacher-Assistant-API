import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CategoryQuestionConfig {
  @IsNumber()
  numberOfQuestions: number;

  @IsNumber()
  questionTypeId: number;

  @IsNumber()
  skillCategoryId: number;

  @IsNumber()
  complexityLevel: number;

  @IsArray()
  @IsString({ each: true })
  focusAreas: string[];
}

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  teacherInstruction?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  files?: string[];

  @IsNumber()
  subjectId: number;

  @IsNumber()
  proficiencyLevelId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryQuestionConfig)
  skillCategoryConfig: CategoryQuestionConfig[];
}
