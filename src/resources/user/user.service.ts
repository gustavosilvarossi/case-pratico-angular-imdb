import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/Bases/Base.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<CreateUserDto> {

  constructor() {
    super('users', UserService.name);
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      if (!createUserDto) throw new Error('Data not found');

      return await this.prisma.$transaction(async (transaction) => {
        const exists = await this.prisma.users.findFirst({
          where: {
            email: createUserDto.email,
          },
        });

        if (!!exists)
          throw new HttpException('User already created', HttpStatus.CONFLICT);

        const salt = await bcrypt.genSalt();

        await transaction.users.create({
          data: {
            ...createUserDto,
            salt,
            password: await bcrypt.hash(createUserDto.password, salt),
          },
        });
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
