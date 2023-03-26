import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';

@Controller('api/carrito')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  async create() {
    const timestamp = new Date();
    const shoppingCart = new CreateShoppingCartDto(timestamp);
    const uuid = await this.shoppingCartService.create(shoppingCart);
    shoppingCart.uuid = uuid;
    return shoppingCart;
    //return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Post(':uuid/productos')
  async addProduct(@Param('uuid') uuid: string, @Body() product: any) {
    const { product_uuid } = product;
    const response = await this.shoppingCartService.addProduct(uuid, product_uuid);
    if(response){
       return response;
    }else{
       return {error: 'carrito de compras no encontrado'};
    }
  }

  @Get(':uuid/productos')
  async getProducts(@Param('uuid') uuid: string) {
    const response = await this.shoppingCartService.getProducts(uuid);
    if(response){
        return response;
    }else{
        return {error: 'carrito de compras no encontrado'};
    }
  }
  


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(+id);
  }
}
