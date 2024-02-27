// export class CreateUserDTO {
//   name: string;
//   email: string;
//   password: string;
// }

import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
