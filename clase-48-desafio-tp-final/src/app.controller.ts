import { AppService } from './app.service';
import { Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';



@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}
  



  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  //@UseGuards(JwtAuthGuard)
  @Get('config')
  getConfig(): any {
    return this.appService.getConfig();
  }




}