import { AppService } from './app.service';
import { Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';



@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}
  



  @UseGuards(LocalAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}