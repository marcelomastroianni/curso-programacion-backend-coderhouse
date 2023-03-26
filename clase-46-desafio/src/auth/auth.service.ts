import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}


  
   isValidPassword =  (user, password) => {
      return  bcrypt.compareSync(password, user.password);
   }


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);


    //if (user && user.password === pass) {
    if (user && this.isValidPassword(user,pass)) {
      const { password, ...result } = user._doc;
      return result;
    }
    return null;
  }

  async login(user: any) {
    //const payload = { username: user.username, sub: user.userId };
    const payload = { username: user.username, sub: user.uuid , is_admin: user.is_admin };
    return { 
      access_token: this.jwtService.sign(payload),
    };
  }
}

