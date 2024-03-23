import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { MongooseConfigService } from './config/mogoose-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
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
