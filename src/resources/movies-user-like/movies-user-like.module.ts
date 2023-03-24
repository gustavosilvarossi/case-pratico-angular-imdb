import { Module } from '@nestjs/common';
import { MoviesUserLikeService } from './movies-user-like.service';
import { MoviesUserLikeController } from './movies-user-like.controller';

@Module({
  controllers: [MoviesUserLikeController],
  providers: [MoviesUserLikeService]
})
export class MoviesUserLikeModule {}
