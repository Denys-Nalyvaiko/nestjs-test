// export class CreateCatDTO {
//   name: string;
//   age: number;
//   breed: string;
// }

import { z } from 'zod';

export const createCatsSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    age: z.number({
      required_error: 'Age is required',
      invalid_type_error: 'Age muste be a number',
    }),
    breed: z.string({
      required_error: 'Breed is required',
      invalid_type_error: 'Breed must be a string',
    }),
  })
  .required();

export type CreateCatDTO = z.infer<typeof createCatsSchema>;
