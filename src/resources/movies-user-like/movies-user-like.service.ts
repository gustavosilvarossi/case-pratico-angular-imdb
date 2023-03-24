import { Injectable } from '@nestjs/common';
import { CreateMoviesUserLikeDto } from './dto/create-movies-user-like.dto';
import { BaseService } from 'src/Bases/Base.service';

@Injectable()
export class MoviesUserLikeService extends BaseService<CreateMoviesUserLikeDto> {

  constructor() {
    super('userMoviesLike', MoviesUserLikeService.name);
  }

}
