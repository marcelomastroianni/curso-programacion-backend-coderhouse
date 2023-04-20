import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Headers} from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping_cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping_cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/carrito')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}


  decodeJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  getEmailFromJWT(authorization){
    let payload = this.decodeJwt(authorization);
    return payload.email;
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Headers('Authorization') authorization: string,

  ) {
    const timestamp = new Date();
    const email = this.getEmailFromJWT(authorization);
    const shoppingCart = new CreateShoppingCartDto(timestamp,email);
    const uuid = await this.shoppingCartService.create(shoppingCart);
    shoppingCart.uuid = uuid;
    return shoppingCart;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid/productos/:product_uuid')
  async removeProduct(@Param('uuid') uuid: string, @Param('product_uuid') product_uuid: string) {
    const response = await this.shoppingCartService.deleteProduct(uuid, product_uuid);
    if(response){
        return response;
    }else{
        return {error: 'carrito de compras no encontrado'};
    }
  }



  @UseGuards(JwtAuthGuard)
  @Get(':uuid/productos')
  async getProducts(@Param('uuid') uuid: string) {
    const response = await this.shoppingCartService.getProducts(uuid);
    if(response){
        return response;
    }else{
        return {error: 'carrito de compras no encontrado'};
    }
  }
  

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    const deleted = await this.shoppingCartService.remove(uuid);
    if (deleted) {
        return {description:"carrito eliminado"};
    } else {
        return {error: 'carrito no encontrado'};
    }
  }
}
