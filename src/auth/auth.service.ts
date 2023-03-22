import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resources/user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unatorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  login(user: any): UserToken {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name_user,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {

    const user = await this.userService.prisma.users.findUnique({ where: { email: email.toLocaleLowerCase() } })

    if (!user) throw new UnauthorizedError('No email found');

    if (user.errorPassword == 5) throw new UnauthorizedError('User blocked by error password');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      await this.userService.prisma.users.update({
        where: { id: user.id },
        data: {
          errorPassword: +user.errorPassword + 1,
        },
      });

      throw new UnauthorizedError('Password Incorrect');
    }

    if (isPasswordValid) {
      return {
        ...user,
        password: undefined,
      };
    }
  }
}

