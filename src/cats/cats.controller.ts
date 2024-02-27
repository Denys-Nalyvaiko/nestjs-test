import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDTO, createCatsSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';
import { RoleGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('/cats')
@UseGuards(RoleGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createCatsSchema))
  async create(@Body() createCatDTO: CreateCatDTO) {
    this.catsService.create(createCatDTO);
  }
}
