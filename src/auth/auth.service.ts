import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User, UserRole, UserStatus } from 'src/db/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { RequestLogger } from '../logger/types/logger';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // validate credentials and return full User
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email, status: Not(UserStatus.DELETED) },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  // generate tokens and store hashed refresh token
  async login(
    user: User,
    logger?: RequestLogger,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    logger?.audit('USER_LOGIN: Already in service', {
      name: user.firstName,
    });
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    user.currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersRepo.save(user);

    return { accessToken, refreshToken };
  }

  // verify refresh token and issue new tokens
  async refreshTokens(userId: number, rt: string) {
    const user = await this.usersRepo.findOneOrFail({ where: { id: userId } });
    if (!user.currentHashedRefreshToken)
      throw new UnauthorizedException('Invalid refresh token');
    const isMatch = await bcrypt.compare(rt, user.currentHashedRefreshToken);
    if (!isMatch) throw new UnauthorizedException('Invalid refresh token');
    return this.login(user);
  }

  async handleForgotPassword(email: string, logger: RequestLogger) {
    const user = await this.usersRepo.findOne({
      where: { email, status: UserStatus.ACTIVE },
    });
    if (!user) {
      // don’t throw or indicate failure—just bail out
      return;
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.oneTimeToken = token;
    await this.usersRepo.save(user);

    const resetLink = `${process.env.CLIENT_BASE_URL}set-password?token=${token}&email=${encodeURIComponent(email)}`;

    // 3) send email (using your mailer of choice)
    await this.emailService.sendTemplateEmail(
      user.email as string,
      'reset-password',
      {
        first_name: user.firstName,
        product_name: 'homerworkrooster',
        reset_url: resetLink,
      },
      logger,
    );
  }

  async handleSetPassword(dto: SetPasswordDto) {
    const user = await this.usersRepo.findOne({
      where: {
        email: dto.email,
        oneTimeToken: dto.token,
        status: In([
          UserStatus.INVITED,
          UserStatus.REGISTERED,
          UserStatus.ACTIVE,
        ]),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
    // user.oneTimeToken = null;
    user.status = UserStatus.ACTIVE;

    await this.usersRepo.save(user);
  }

  async registerTeacher(dto: RegisterTeacherDto, logger: RequestLogger) {
    // Check if user already exists
    const existingUser = await this.usersRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate one-time token
    const oneTimeToken = crypto.randomBytes(32).toString('hex');

    // Create new teacher user
    const newUser = this.usersRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      role: UserRole.TEACHER,
      status: UserStatus.REGISTERED,
      termsAndConditions: dto.termsAndConditions,
      emailNotifications: dto.emailNotifications,
      oneTimeToken,
    });

    const savedUser = await this.usersRepo.save(newUser);

    logger.audit('TEACHER_REGISTERED', {
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    });
    return;
  }
}
