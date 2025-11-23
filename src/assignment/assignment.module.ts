import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subject } from 'src/db/entities/subject.entity';
import { AssignmentGenerationService } from './assignment-generation.service';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentGenerationService],
  exports: [AssignmentService, AssignmentGenerationService],
})
export class AssignmentModule {}
