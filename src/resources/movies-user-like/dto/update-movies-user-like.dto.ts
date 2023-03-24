import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesUserLikeDto } from './create-movies-user-like.dto';

export class UpdateMoviesUserLikeDto extends PartialType(CreateMoviesUserLikeDto) {}
