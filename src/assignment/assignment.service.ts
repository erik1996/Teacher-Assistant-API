import { Injectable } from '@nestjs/common';

import { RequestLogger } from '../logger/types/logger';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  create(
    createAssignmentDto: CreateAssignmentDto,
    userId: number,
    logger: RequestLogger,
  ): boolean {
    // TODO: Implement assignment creation logic
    logger.info('Assignment creation request received', {
      userId,
      assignmentData: createAssignmentDto,
    });

    return true;
  }
}
