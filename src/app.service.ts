import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllRecords() {
    try {
      const data = await this.prisma.records.findMany();

      return {
        message: 'Succesfully fetched records',
        data: data,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch records',
        error: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getRecordById(id: string) {
    try {
      const exist = await this.prisma.records.findFirst({
        where: {
          device_id: id,
        },
      });

      if (!exist) {
        return {
          message: 'Record not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const data = await this.prisma.records.findMany({
        where: {
          device_id: id,
        },
      });

      return {
        message: 'Succesfully fetched record',
        data: data,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch record',
        error: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
