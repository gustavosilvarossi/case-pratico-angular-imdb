import { Prisma } from "@prisma/client";

export class MoviesUserLike implements Prisma.userMoviesLikeUncheckedCreateInput {
    id?: string;
    usersId: string;
    movieID: string;
}
