import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import UsersService from './users.service';
import CreateUserDTO from './dto/create-user.dto';

@Controller('/users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async findOne(@Param() params: any, @Res() res: Response) {
    const user = await this.usersService.findOne(params.id);
    res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO, @Res() res: Response) {
    const id = (Math.random() * 10).toString();
    const user = await this.usersService.create({ id, ...createUserDTO });

    res.status(HttpStatus.CREATED).json(user);
  }
}

export default UsersController;
