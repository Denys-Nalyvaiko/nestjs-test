import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  // UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
// import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp({ ...signUpDTO });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn({ ...signInDTO });
  }

  // @UseGuards(AuthGuard)
  @Get('current')
  getCurrent(@Req() request: Request) {
    return request['user'];
  }
}
