import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(user: User): Promise<User | undefined> {
    return this.users.find(({ id }) => id === user.id);
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
