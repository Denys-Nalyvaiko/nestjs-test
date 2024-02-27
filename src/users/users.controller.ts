import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserValidationPipe } from './pipe/user-validation.pipe';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      res.status(HttpStatus.OK).json(users);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }

  @Post()
  async create(
    @Body(new UserValidationPipe()) createUserDTO: CreateUserDTO,
    @Res() res: Response,
  ) {
    const id = Date.now().toString();

    try {
      const user = await this.usersService.create({ id, ...createUserDTO });
      res.status(HttpStatus.CREATED).json(user);
    } catch ({ message, status }) {
      throw new HttpException(message, status);
    }
  }
}
