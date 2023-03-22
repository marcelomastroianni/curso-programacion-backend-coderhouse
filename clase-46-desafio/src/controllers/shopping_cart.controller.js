

const CreateShoppingCartDto = require('../dtos/shopping_cart.dto.js').CreateShoppingCartDto;

const ShoppingCartService = require('../services/shopping_cart.service.js');


class ShoppingCartController {
   constructor() {
      this.shoppingCartService = new ShoppingCartService();
  }

  addProduct = async (req, res) => {
      const { uuid } = req.params;
      const { product_uuid } = req.body;
      const response = await this.shoppingCartService.addProduct(uuid, product_uuid);

      if(response){
         res.send(response);
      }else{
         res.send({error: 'carrito de compras no encontrado'});
      }
   }

   deleteProduct = async (req, res) => {
      const { uuid, product_uuid } = req.params;
      const response = await this.shoppingCartService.deleteProduct(uuid, product_uuid);
      if(response){
         res.send(response);
      }else{
         res.send({error: 'carrito de compras no encontrado'});
      }
   }

   getProducts = async (req, res) => {
      const { uuid } = req.params;
      const response = await this.shoppingCartService.getProducts(uuid);
      if(response){
         res.send(response);
      }else{
         res.send({error: 'carrito de compras no encontrado'});
      }
   }

   create = async (req, res) => {
      const timestamp = new Date();
      const shoppingCart = new CreateShoppingCartDto(timestamp);
      const uuid = await this.shoppingCartService.create(shoppingCart);
      shoppingCart.uuid = uuid;
      res.send(shoppingCart);
   }

   delete = async (req, res) => {
      const { uuid } = req.params;
      const deleted = await this.shoppingCartService.delete(uuid);
      if (deleted) {
         res.send({description:"carrito eliminado"});
      } else {
         res.send({error: 'carrito no encontrado'});
      }
   }

}

module.exports = ShoppingCartController

