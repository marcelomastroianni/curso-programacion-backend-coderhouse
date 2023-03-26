import { AppService } from './app.service';
import { Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}
  

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*
    $ # GET /profile
    $ curl http://localhost:3000/profile
    $ # result -> {"statusCode":401,"message":"Unauthorized"}

    $ # POST /auth/login
    $ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
    $ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }

    $ # GET /profile using access_token returned from previous step as bearer code
    $ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
    $ # result -> {"userId":1,"username":"john"}

  */


  @UseGuards(LocalAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}