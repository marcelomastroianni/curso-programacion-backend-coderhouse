import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createTransport } from 'nodemailer';



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

  async sendNewUserCreatedEmail(user: any) {
    const TEST_MAIL = 'jaiden97@ethereal.email';
    const TEST_MAIL_PASSWORD = 'M9KhTan3sYtc7u2ah5';
    const TEST_MAIL_FROM = 'jaiden97@ethereal.email'

    const transporter = createTransport({
       host: 'smtp.ethereal.email',
       port: 587,
       auth: {
           user: TEST_MAIL,
           pass: TEST_MAIL_PASSWORD
       }
    });


    const mailTemplate = `
    <h1 style="color: black;">Se ha registrado un nuevo usuario: ${user.username}</h1>
    <p>Es administrador: ${user.is_admin}</p>
    <p>Email: ${user.email}</p>

    `

    
    const mailOptions = {
        from: TEST_MAIL_FROM,
        to: 'marcelomastroianni@gmail.com',
        subject: 'Se ha registrado un nuevo usuario!',
        html: mailTemplate
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
    
  }

  async register(user: any) {
    let response = await this.usersService.create(user);
    if (response) {

      await this.sendNewUserCreatedEmail(user);

      const payload = { username: user.username, sub: user.uuid , is_admin: user.is_admin };
      return { 
        access_token: this.jwtService.sign(payload),
      };
    }else{
      return null;
    }
  }

}

