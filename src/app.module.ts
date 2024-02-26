import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.PATCH },
      )
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}
