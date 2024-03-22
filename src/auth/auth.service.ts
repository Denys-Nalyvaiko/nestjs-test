import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { IUserSignIn } from './interfaces/userSignIn.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    signUpDTO.password = await bcrypt.hash(
      signUpDTO.password,
      this.configService.get<string>('saltRounds'),
    );

    const user = await this.usersService.create(signUpDTO);
    user.password = undefined;

    return user;
  }

  async signIn(signInDTO: SignInDTO): Promise<IUserSignIn> {
    const user = await this.usersService.findOne(signInDTO.email);

    const isCorrectPassword = await bcrypt.compare(
      user?.password,
      signInDTO.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    if (user?.password !== signInDTO.password) {
      throw new UnauthorizedException();
    }

    user.password = undefined;
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { user, accessToken };
  }
}
