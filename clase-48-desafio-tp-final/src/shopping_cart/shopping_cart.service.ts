import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { DaoFactory } from '../daos/';
import { ProductService } from '../product/product.service';

@Injectable()
export class ShoppingCartService {




  cartDao: any;

  constructor(
    private productService: ProductService
  ) {
    this.cartDao = DaoFactory.getDao('carritos');
  }

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    const uuid = await this.cartDao.save(createShoppingCartDto);
    return uuid;
    //return 'This action adds a new shoppingCart';
  }

  addProduct = async (uuid, product_uuid) => {
      const shoppingCart = await this.cartDao.getById(uuid);
      const product = await this.productService.findOne(product_uuid);
      if (shoppingCart && product) {
          product.quantity = 1;
          if (shoppingCart.products) {
              const productIndex = shoppingCart.products.findIndex(p => p.uuid == product.uuid);
              if (productIndex >= 0) {
                  shoppingCart.products[productIndex].quantity++;
              } else {
                  shoppingCart.products.push(product);
              }
          } 
          await this.cartDao.updateById(uuid, shoppingCart);
          return shoppingCart;
      } else {
          return false;
      }
  }

  deleteProduct = async (uuid, product_uuid) => {
        const shoppingCart = await this.cartDao.getById(uuid);
        if (shoppingCart) {
            const product = await this.productService.findOne(product_uuid);
            if (product) {
                const index = shoppingCart.products.findIndex(p => p.uuid === product.uuid);
                if (index >= 0) {
                    shoppingCart.products.splice(index, 1);
                    await this.cartDao.updateById(uuid, shoppingCart);
                    return shoppingCart;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

  async getProducts(uuid: string) {
    const shoppingCart = await this.cartDao.getById(uuid);
    if (shoppingCart) {
        return shoppingCart.products;
    } else {
        return false;
    }
  }




  async remove(uuid: string) {
    const data = await this.cartDao.getById(uuid);
    if (data) {
        await this.cartDao.deleteById(uuid);
        return true;
    } else {
        return false;
    }
  }
}
