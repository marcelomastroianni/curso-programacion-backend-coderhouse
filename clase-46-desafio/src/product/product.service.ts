import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { DaoFactory } from '../daos/';

@Injectable()
export class ProductService {

  productDao: any;

  constructor() {
    this.productDao = DaoFactory.getDao('productos');
  }



  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    //return `This action returns all product`;
    const data = await this.productDao.getAll();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
