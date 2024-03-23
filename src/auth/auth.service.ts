import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { IUserSignIn } from './interfaces/userSignIn.interface';
import { User } from 'src/users/schemas/user.schema';
import { IUserSignUp } from './interfaces/userSignUp.interface';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<IUserSignUp> {
    signUpDTO.password = await bcrypt.hash(
      signUpDTO.password,
      this.configService.get<number>('saltRounds'),
    );

    const user = await this.userModel.create(signUpDTO);
    user.password = undefined;

    return { user: { _id: user._id, name: user.name, email: user.email } };
  }

  async signIn(signInDTO: SignInDTO): Promise<IUserSignIn> {
    const user = await this.userModel.findOne({ email: signInDTO.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await bcrypt.compare(
      signInDTO.password,
      user?.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
    });

    user.accessToken = accessToken;

    await user.save();
    user.password = undefined;

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    };
  }
}
