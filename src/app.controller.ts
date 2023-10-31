import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('pdf')
  async getData(): Promise<string> {
    // await this.appService.createProject()
    // await this.appService.addAsset()
    return await this.appService.getData()
  }
}
