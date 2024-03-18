import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDTO: SignInDTO) {
    const user = await this.usersService.findOne(signInDTO.email);

    if (user?.password !== signInDTO.password) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
