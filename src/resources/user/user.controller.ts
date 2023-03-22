import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseController } from 'src/Bases/Base.controller';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { HttpExceptionFilter } from 'src/Bases/BaseException';

@Controller('user')
export class UserController extends BaseController<CreateUserDto> {

  constructor() {
    super(UserService, UserController.name);
  }

  @Post('new-user')
  @IsPublic()
  @UseFilters(new HttpExceptionFilter())
  async createUser(@Body() user: any) {
    try {
      return await this.service.createUser(user);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }

  }

}
