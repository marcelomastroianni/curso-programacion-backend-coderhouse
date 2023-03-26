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



  async create(createProductDto: CreateProductDto) {
    const uuid = await this.productDao.save(createProductDto);
    return uuid;
  }

  async findAll() {
    //return `This action returns all product`;
    const data = await this.productDao.getAll();
    return data;
  }

  async findOne(uuid: string) {
    //return `This action returns a #${id} product`;
    const data = await this.productDao.getById(uuid);
    return data;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    const response = await this.productDao.updateById(uuid, updateProductDto);
    return response;
  }

  async remove(uuid: string) {
    const data = await this.productDao.getById(uuid);
    if (data) {
        await this.productDao.deleteById(uuid);
        return true;
    } else {
        return false;
    }
  }
}
