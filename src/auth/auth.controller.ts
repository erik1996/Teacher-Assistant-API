// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/db/entities/user.entity';
import { Public } from './auth-constants';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RtAuthGuard } from './guards/rt-auth.guard';

@Public()
@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    req.logger.audit('USER_LOGIN controller', {
      email: dto.email,
    });
    const authUser = req.user as AuthUser as User;
    return this.authService.login(authUser, req.logger);
  }

  // POST /auth/refresh
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Body() dto: RefreshDto) {
    const authUser = req.user as AuthUser;
    return this.authService.refreshTokens(authUser.id, dto.refreshToken);
  }

  // POST /auth/forgot-password
  @Post('forgot-password')
  async forgotPassword(@Req() req: Request, @Body() dto: ForgotPasswordDto) {
    await this.authService.handleForgotPassword(dto.email, req.logger);
    return {
      message: "You'll receive instructions on how to reset your password.",
    };
  }

  // POST /auth/set-password
  @Post('set-password')
  async setPassword(@Body() dto: SetPasswordDto) {
    await this.authService.handleSetPassword(dto);
    return { message: 'Your password has been set successfully.' };
  }

  // POST /auth/register/teacher
  @Post('register/teacher')
  @HttpCode(HttpStatus.CREATED)
  async registerTeacher(@Req() req: Request, @Body() dto: RegisterTeacherDto) {
    req.logger.audit('TEACHER_REGISTER controller', {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return this.authService.registerTeacher(dto, req.logger);
  }
}
