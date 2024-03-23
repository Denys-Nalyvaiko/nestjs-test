import { User } from 'src/users/interfaces/users.interface';

export interface IUserSignUp {
  user: Omit<User, 'password'>;
}
