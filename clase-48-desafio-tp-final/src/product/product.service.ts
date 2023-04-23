import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { DaoFactory } from '../daos/';

import logger from '../logger/logger';


@Injectable()
export class ProductService {




  productDao: any;

  constructor() {
    this.productDao = DaoFactory.getDao('productos');
  }



  async create(createProductDto: CreateProductDto) {
    const uuid = await this.productDao.save(createProductDto);
    createProductDto.uuid = uuid;
    logger.info(`Product created with uuid: ${uuid}`);
    return createProductDto;
  }

  async findAll() {
    const data = await this.productDao.getAll();
    return data;
  }

  async findAllByCategory(category: string) {
    const data = await this.productDao.getAll();
    return data.filter((product) => product.category === category);
  }

  async findOne(uuid: string) {
    const data = await this.productDao.getById(uuid);
    return data;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    const response = await this.productDao.updateById(uuid, updateProductDto);
    logger.info(`Product updated with uuid: ${uuid}`);
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
