import { Test, TestingModule } from '@nestjs/testing';
import { MoviesUserLikeController } from './movies-user-like.controller';
import { MoviesUserLikeService } from './movies-user-like.service';

describe('MoviesUserLikeController', () => {
  let controller: MoviesUserLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesUserLikeController],
      providers: [MoviesUserLikeService],
    }).compile();

    controller = module.get<MoviesUserLikeController>(MoviesUserLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
