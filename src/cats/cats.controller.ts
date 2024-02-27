import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CreateCatDTO, createCatsSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatsSchema))
  async create(@Body() createCatDTO: CreateCatDTO) {
    this.catsService.create(createCatDTO);
  }
}
