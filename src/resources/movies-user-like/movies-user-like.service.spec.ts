import { Test, TestingModule } from '@nestjs/testing';
import { MoviesUserLikeService } from './movies-user-like.service';

describe('MoviesUserLikeService', () => {
  let service: MoviesUserLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesUserLikeService],
    }).compile();

    service = module.get<MoviesUserLikeService>(MoviesUserLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
