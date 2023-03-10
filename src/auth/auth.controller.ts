import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SignupDto } from 'src/user/dto/singup.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './role.decorator';
import { ERole } from './role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = await this.userService.getProfile(req.user['username']);
    return user;
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { username, password } = signupDto;
    return await this.authService.signUp(username, password);
  }

  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(ERole.Admin)
  @Get('test/user')
  getProtected() {
    return 'protected data';
  }
}
