import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CatsController from './cats/cats.controller';
import CatsService from './cats/cats.service';
import UsersController from './users/users.controller';
import UsersService from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, UsersController],
  providers: [AppService, CatsService, UsersService],
})
export class AppModule {}
