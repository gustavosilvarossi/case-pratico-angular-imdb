import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';


export class BaseService<T> {
  entity: string;
  prisma: PrismaService;
  logger: Logger;

  constructor(entity: string, name_service: string) {
    this.entity = entity;
    this.checkInstance();
    this.logger = new Logger(`${BaseService.name} - ${name_service}`);
  }

  private checkInstance() {
    if (!this.prisma) {
      this.prisma = new PrismaService();
    }
  }

  async create(data: T) {
    try {
      if (!data) throw new Error('Data not found');

      const result = await this.prisma[this.entity].create({ data });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, data: T) {
    try {
      if (!id) throw new Error('Id not found');
      if (JSON.stringify(data) === '{}') throw new Error('Data not found');

      return await this.prisma[this.entity].update({ where: { id }, data: { ...data, updatedAt: new Date().toISOString() } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      if (!id) throw new Error('Id not found');

      return await this.prisma[this.entity].update({
        where: { id },
        data: {
          deletedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async find(filterEntity: any) {
    try {

      if (!filterEntity) throw new Error('Data to find entity not found');

      return await this.prisma[this.entity].findMany({
        skip: !!filterEntity.skip ? filterEntity.skip : 0,
        ...(!!filterEntity.where && { where: filterEntity.where }),
        ...(!!filterEntity.select && { select: filterEntity.select }),
        take: !!filterEntity.take ? filterEntity.take : 80,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(filterEntity: any) {
    try {
      if (!filterEntity) throw new Error('Data to find entity not found');

      let entityFound = await this.prisma[this.entity].findFirst({
        skip: !!filterEntity.skip ? filterEntity.skip : 0,
        ...(!!filterEntity.where && { where: filterEntity.where }),
        ...(!!filterEntity.select && { select: filterEntity.select }),
        take: !!filterEntity.take ? filterEntity.take : 80,
      });

      delete entityFound?.password;

      return entityFound;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

