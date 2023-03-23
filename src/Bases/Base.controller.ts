import { Body, ForbiddenException, Logger, Param, Post, Req, UseFilters, } from '@nestjs/common';
import { HttpExceptionFilter } from './BaseException';
import { Request } from 'express';

export class BaseController<T> {
  name_controller: string;
  service: any;
  logger: Logger;

  constructor(service: any, name_controller: string) {
    this.service = new service();
    this.name_controller = name_controller;
    this.logger = new Logger(
      `${BaseController.name} - ${this.name_controller}`,
    );
  }

  @Post('/create')
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() data: T) {
    try {
      return await this.service.create(data);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }
  }

  @Post('/find/all')
  async find(@Req() request: Request) {
    try {
      const filterData = request.body;

      return await this.service.find(filterData);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }
  }

  @Post('/find/one')
  async findOne(@Req() request: Request) {
    try {
      const filterData = request.body;

      return await this.service.findOne(filterData);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }
  }

  @Post('/update/:id')
  @UseFilters(new HttpExceptionFilter())
  async update(@Param('id') id: number, @Body() data: T) {
    try {
      return await this.service.update(id, data);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }
  }

  @Post('/delete/:id')
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: number) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new ForbiddenException(error.message);
    }
  }
}

