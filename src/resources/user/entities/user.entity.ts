import { Prisma } from "@prisma/client";

export class User implements Prisma.usersUncheckedCreateInput {
    id?: string;
    email: string;
    name_user: string;
    password: string;
    salt: string;
    errorPassword: number;
}
