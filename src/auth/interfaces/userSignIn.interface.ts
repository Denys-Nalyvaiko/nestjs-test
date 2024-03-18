import { User } from 'src/users/interfaces/users.interface';

export interface IUserSignIn {
  user: Omit<User, 'password'>;
  accessToken: string;
}
