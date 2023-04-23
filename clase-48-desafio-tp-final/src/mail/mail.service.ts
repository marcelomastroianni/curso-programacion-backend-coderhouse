import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { config } from '../config/config';
import logger from '../logger/logger';

@Injectable()
export class MailService {

    getTransporter() {
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
        return transporter;
    }

    async sendNewUserCreatedEmail(user: any) {

        let transporter = this.getTransporter();
        
          
    
    
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
            to: config.MAIL_TO,
            subject: 'Se ha registrado un nuevo usuario!',
            html: mailTemplate
        }
        
        try {
            const info = await transporter.sendMail(mailOptions)
            logger.info(info)
            logger.info(`Email sent to ${config.MAIL_TO}`)
        } catch (error) {
            logger.error(error)
            logger.error(`Error sending email to ${config.MAIL_TO}`)
        }
        
      }


      async sendNewOrderEmail(order:any) {

        let transporter = this.getTransporter();
    
        const mailTemplate = `
        <h1 style="color: black;">Se ha registrado una nueva orden:</h1>
    
        Usuario:
    
        <p style="color: black;">${order.email}</p>
        
        Productos:
    
        <br/>
        <br/>
        
        <table style="width:100%">
    
          <tr>
            <th style="color: black;text-align: left;">Descripción</th>
            <th style="color: black;text-align: left;">Cantidad</th>
            <th style="color: black;text-align: left;">Precio</th>
          </tr>
    
        ${order.products.map((product:any) => {
          return `
          <tr>
          <td style="color: black;">${product.description}</td>
          <td style="color: black;">${product.stock}</td>
          <td style="color: black;">${product.price}</td>
          </tr>
          `
        }).join('')}
        </table>
    
        <br/>
        <br/>
        
        Fecha de creación:
    
        <p style="color: black;">${order.timestamp}</p>
    
        ID de la orden:
    
        <p style="color: black;">${order.uuid}</p>
        `
    
        
        const mailOptions = {
            from: config.MAIL_FROM,
            to: config.MAIL_TO,
            subject: 'Se ha registrado una nueva orden!',
            html: mailTemplate
        }
        
        try {
            const info = await transporter.sendMail(mailOptions)
            logger.info(info);
            logger.info(`Email sent to ${config.MAIL_TO}`)
        } catch (error) {
            logger.error(error);
            logger.error(`Error sending email to ${config.MAIL_TO}`);
        }
        
      }
    

}
