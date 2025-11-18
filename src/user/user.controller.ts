import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../db/entities/user.entity';
import { RequestLogger } from '../logger/types/logger';
import { GetStudentsDto } from './dto/get-students.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('students')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER)
  async getInvitedStudents(
    @Query() getStudentsDto: GetStudentsDto,
    @Request() req: any,
  ) {
    const logger: RequestLogger = req.logger;
    const userId: number = req.user.id;

    logger.info('Get students request received', {
      requestedBy: userId,
      filters: getStudentsDto,
    });

    return await this.userService.teacherStudentsList(
      getStudentsDto,
      userId,
      logger,
    );
  }
}
