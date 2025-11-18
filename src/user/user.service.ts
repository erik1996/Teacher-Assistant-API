import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole } from '../db/entities/user.entity';
import { EmailService } from '../email/email.service';
import { RequestLogger } from '../logger/types/logger';
import { GetStudentsDto } from './dto/get-students.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async teacherStudentsList(
    getStudentsDto: GetStudentsDto,
    teacherId: number,
    logger: RequestLogger,
  ): Promise<{ students: User[]; total: number }> {
    try {
      const {
        page = 1,
        limit = 10,
        group_id,
        status,
        search,
        is_active,
      } = getStudentsDto;
      const skip = (page - 1) * limit;

      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user_group', 'ug', 'ug.user_id = user.id')
        .leftJoinAndSelect('groups', 'group', 'group.id = ug.group_id')
        .where('user.role = :role', { role: UserRole.STUDENT })
        .andWhere('group.managed_by = :teacherId', { teacherId });

      if (group_id) {
        queryBuilder.andWhere('group.id = :group_id', { group_id });
      }

      if (status) {
        queryBuilder.andWhere('user.status = :status', { status });
      }

      if (search) {
        queryBuilder.andWhere(
          '(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))',
          { search: `%${search}%` },
        );
      }

      if (is_active !== undefined) {
        queryBuilder.andWhere('ug.is_active = :is_active', { is_active });
      }

      const [students, total] = await queryBuilder
        .select([
          'user.id',
          'user.email',
          'user.firstName',
          'user.lastName',
          'user.createdAt',
          'user.updatedAt',
        ])
        .orderBy('user.createdAt', 'DESC')
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      logger.info(`Retrieved ${students.length} students from managed groups`, {
        teacherId,
        total,
        page,
        limit,
        filters: { group_id, status, search, is_active },
      });

      return { students, total };
    } catch (error) {
      logger.error(
        `Failed to get students from managed groups: ${error.message}`,
        {
          teacherId,
          stack: error?.stack || error?.toString() || 'Unknown error',
        },
      );

      throw new InternalServerErrorException(
        'Failed to retrieve students from managed groups',
      );
    }
  }
}
