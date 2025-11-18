import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import type { StrategyOptionsWithoutRequest } from 'passport-jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserStatus } from 'src/db/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { AuthUser } from '../dto/auth-user.dto';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error('Missing JWT_REFRESH_SECRET in environment');
    }

    const opts: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: secret,
    };
    super(opts);
  }

  async validate(payload: { sub: number; role: number }): Promise<AuthUser> {
    const user = await this.usersRepo.findOne({
      where: { id: payload.sub, status: Not(UserStatus.DELETED) },
      select: ['id', 'firstName', 'lastName', 'email', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user as AuthUser;
  }
}
