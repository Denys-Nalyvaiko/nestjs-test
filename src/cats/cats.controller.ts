import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDTO, createCatsSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';
// import { RoleGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { TimeoutInterceptor } from 'src/common/interceptor/timeout.interceptor';
import { Role } from 'src/enums/role.enum';

@Controller('/cats')
// @UseGuards(RoleGuard)
@UseInterceptors(TransformInterceptor, TimeoutInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(new ZodValidationPipe(createCatsSchema))
  async create(@Body() createCatDTO: CreateCatDTO) {
    this.catsService.create(createCatDTO);
  }
}
