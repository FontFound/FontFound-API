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

  async getRecordsByDeviceId(id: string) {
    try {
      const data = await this.prisma.records.findMany({
        where: {
          device_id: id,
        },
      });

      return {
        message: 'Succesfully Get Data By Device Id',
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

  async createRecord(data: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createData = await this.prisma.records.create({
        data: {
          device_id: data.device_id,
          result: data.result,
          image_url: data.image_url,
        },
      });

      return {
        message: 'Successfully created record',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create record',
        error: error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
