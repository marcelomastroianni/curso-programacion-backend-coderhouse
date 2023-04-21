import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DaoFactory } from '../daos/';
import { createTransport } from 'nodemailer';

import { config } from '../config/config';


@Injectable()
export class OrderService {

  cartDao: any;
  orderDao: any;

  constructor() {
    this.cartDao = DaoFactory.getDao('carritos');
    this.orderDao = DaoFactory.getDao('ordenes');
  }


  async sendNewOrderEmail(order:any) {

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
        to: 'marcelomastroianni@gmail.com',
        subject: 'Se ha registrado una nueva orden!',
        html: mailTemplate
    }
    
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
    
  }



  async create(shopping_cart_uuid: string) {
    const shopping_cart = await this.cartDao.getById(shopping_cart_uuid);
    const timestamp = new Date();

    if(shopping_cart){
      const order = new CreateOrderDto(timestamp,shopping_cart.email,shopping_cart.products);
      const uuid = await this.orderDao.save(order);
      order.uuid = uuid;
      await this.sendNewOrderEmail(order);
      return order;
    }else{
      return {error: 'carrito de compras no encontrado'};
    }


  }

  findAll() {

  }

  findOne(id: number) {
  }

}
