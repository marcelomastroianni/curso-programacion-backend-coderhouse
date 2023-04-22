import { Injectable } from '@nestjs/common';
import { DaoFactory } from '../daos';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {

  menssageDao: any;

  constructor() {
    this.menssageDao = DaoFactory.getDao('mensajes');
  }


  async findAll() {
    return await this.menssageDao.getAll();
  }

  async findAllByUser(user: string) {
    let data = await this.menssageDao.getAll();
    return data.filter((message) => (message.email === user ) );
  }

}
