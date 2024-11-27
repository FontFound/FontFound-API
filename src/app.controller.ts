import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('records')
  async getAllRecords() {
    return await this.appService.getAllRecords();
  }

  @Get('records/:id')
  async getRecordById(@Param('id') id: string) {
    return await this.appService.getRecordById(id);
  }
}
