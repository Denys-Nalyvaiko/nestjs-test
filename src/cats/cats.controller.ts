import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Redirect,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import CreateCatDTO from './create-cat.dto';
import UpdateCatDTO from './update-cat.dto';

@Controller('/cats')
class CatsController {
  @Post()
  async create(@Body() createCatDTO: CreateCatDTO): Promise<string> {
    console.log(createCatDTO);
    return 'This action create new cat';
  }

  @Get()
  async findAll(@Req() request: Request): Promise<string> {
    return `This action returns all cats whit url ${request.url}`;
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<string> {
    console.log(params.id);
    return `This action returns cat with id ${params.id}`;
  }

  @Put(':id')
  async update(
    @Param() params: any,
    updateCatDTO: UpdateCatDTO,
  ): Promise<string> {
    return `This action update cat with id ${params.id} (body: ${updateCatDTO})`;
  }

  @Delete(':id')
  @Redirect('http://localhost:3000', 301)
  async remove(@Param() params: any): Promise<string> {
    return `This action remove cat with id ${params.id}`;
  }
}

export default CatsController;
