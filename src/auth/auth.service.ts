import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { IUserSignIn } from './interfaces/userSignIn.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    const user = await this.usersService.create(signUpDTO);
    user.password = undefined;

    return user;
  }

  async signIn(signInDTO: SignInDTO): Promise<IUserSignIn> {
    const user = await this.usersService.findOne(signInDTO.email);

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
