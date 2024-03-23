import {
  Injectable,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      _id: {},
      name: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      _id: {},
      name: 'maria',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    const targetUser = await this.users.find(
      ({ email: userEmail }) => email === userEmail,
    );

    if (!targetUser) {
      throw new UnauthorizedException('Here');
    }

    return targetUser;
  }

  // async findById(id: number): Promise<User | undefined> {
  //   const targetUser = await this.users.find(({ id: userId }) => id === userId);

  //   if (!targetUser) {
  //     throw new NotFoundException();
  //   }

  //   return targetUser;
  // }

  // async create(user: Omit<User, 'id'>): Promise<User> {
  //   const generatedId = this.users.at(-1) ? this.users.at(-1).id + 1 : 1;
  //   const newUser = { id: generatedId, ...user };

  //   this.users.push(newUser);

  //   return newUser;
  // }
}
