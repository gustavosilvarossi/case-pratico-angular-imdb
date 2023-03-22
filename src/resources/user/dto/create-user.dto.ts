import { IsString } from "class-validator";
import { IsEmail, Matches, MaxLength, MinLength } from "class-validator/types/decorator/decorators";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {


    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsEmail()
    email: string;

}
