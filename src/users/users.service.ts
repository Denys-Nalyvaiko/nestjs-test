import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(userId: string): Promise<User | undefined> {
    const targetUser = await this.users.find(({ id }) => id === userId);

    if (!targetUser) {
      throw new NotFoundException();
    }

    return targetUser;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
