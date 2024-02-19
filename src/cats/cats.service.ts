import { Injectable } from '@nestjs/common';
import Cat from './interfaces/cats.interface';

@Injectable()
class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }
}

export default CatsService;
