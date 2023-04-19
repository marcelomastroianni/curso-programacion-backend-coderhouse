import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createTransport } from 'nodemailer';

import { config } from '../config/config';


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

    let transporter;
    
    if (config.MAIL_SERVICE_TYPE === 'gmail') {
      transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.MAIL_FROM,
            pass: config.MAIL_PASSWORD
        }
      });
    } else if (config.MAIL_SERVICE_TYPE === 'ethereal') {
      transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.MAIL_FROM,
            pass: config.MAIL_PASSWORD
        }
      });
    }


    const mailTemplate = `
    <h1 style="color: black;">Se ha registrado un nuevo usuario:</h1>
    <p>Nombre: ${user.username}</p>
    <p>Es administrador: ${user.is_admin}</p>
    <p>Email: ${user.email}</p>
    <p>Telefono: ${user.phone}</p>
    <p>Avatar: ${user.avatar}</p>
    <p>Direccion: ${user.address}</p>
    <p>Alias: ${user.alias}</p>
    <p>Edad: ${user.edad}</p>
    `

    
    const mailOptions = {
        from: config.MAIL_FROM,
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

