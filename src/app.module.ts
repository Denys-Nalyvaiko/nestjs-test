import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule, UsersModule, AuthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
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
