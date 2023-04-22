import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DaoFactory } from '../daos/';
import { MailService } from '../mail/mail.service';


@Injectable()
export class OrderService {

  cartDao: any;
  orderDao: any;

  constructor(private mailService: MailService) {
    this.cartDao = DaoFactory.getDao('carritos');
    this.orderDao = DaoFactory.getDao('ordenes');
  }


  


  async create(shopping_cart_uuid: string) {
    const shopping_cart = await this.cartDao.getById(shopping_cart_uuid);
    const timestamp = new Date();

    if(shopping_cart){
      const order = new CreateOrderDto(timestamp,shopping_cart.email,shopping_cart.products);
      const uuid = await this.orderDao.save(order);
      order.uuid = uuid;
      await this.mailService.sendNewOrderEmail(order);
      return order;
    }else{
      return {error: 'carrito de compras no encontrado'};
    }


  }



}
