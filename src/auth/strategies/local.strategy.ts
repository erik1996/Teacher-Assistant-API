import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserStatus } from 'src/db/entities/user.entity';
import { AuthService } from '../auth.service';
import { AuthUser } from '../dto/auth-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const normalized = email.trim().toLowerCase();
    const user = await this.authService.validateUser(normalized, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenException('Your account has been suspended.');
    }
    if (user.status in [UserStatus.INVITED, UserStatus.REGISTERED]) {
      throw new UnauthorizedException(
        'Please activate your account before logging in.',
      );
    }
    // map to AuthUser DTO to avoid leaking sensitive fields
    const authUser: AuthUser = {
      id: user.id,
      firstName: user.firstName as string,
      lastName: user.lastName as string,
      phoneNumber: user.phoneNumber,
      email: user.email as string,
      role: user.role,
    };
    return authUser;
  }
}
