import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'john',
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      id: 2,
      name: 'maria',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(filter: string | number): Promise<User | undefined> {
    const targetUser = await this.users.find(
      ({ id: userId, email: userEmail }) =>
        filter === userId || filter === userEmail,
    );

    if (!targetUser) {
      throw new NotFoundException();
    }

    return targetUser;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const generatedId = this.users.at(-1) ? this.users.at(-1).id + 1 : 1;
    const newUser = { id: generatedId, ...user };

    this.users.push(newUser);

    return newUser;
  }
}
