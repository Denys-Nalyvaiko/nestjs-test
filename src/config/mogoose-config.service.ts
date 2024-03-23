import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    UserSchema.pre('save', function () {
      console.log('working pre save');
    });

    return {
      uri: this.configService.get<string>('database.host'),
    };
  }
}
