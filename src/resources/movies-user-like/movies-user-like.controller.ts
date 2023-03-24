import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesUserLikeService } from './movies-user-like.service';
import { CreateMoviesUserLikeDto } from './dto/create-movies-user-like.dto';
import { UpdateMoviesUserLikeDto } from './dto/update-movies-user-like.dto';
import { BaseController } from 'src/Bases/Base.controller';

@Controller('movies-user-like')
export class MoviesUserLikeController extends BaseController<CreateMoviesUserLikeDto> {

  constructor() {
    super(MoviesUserLikeService, MoviesUserLikeController.name);
  }

}
