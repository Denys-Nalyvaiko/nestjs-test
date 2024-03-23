import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_CONSTANT } from './constants';
import { AuthGuard } from './auth.guard';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT.SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
