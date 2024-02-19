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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import CreateCatDTO from './create-cat.dto';
import UpdateCatDTO from './update-cat.dto';

@Controller('/cats')
class CatsController {
  @Post()
  async create(
    @Body() createCatDTO: CreateCatDTO,
    @Res() res: Response,
  ): Promise<any> {
    res.status(HttpStatus.CREATED).json(createCatDTO);
  }

  @Get()
  async findAll(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log(`This action returns all cats whit url ${request.url}`);
    res.status(HttpStatus.OK);
    return [];
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
