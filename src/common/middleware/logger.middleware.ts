import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request ...');
    next();
  }
}

// export const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Functional request ...');
//   next();
// };
