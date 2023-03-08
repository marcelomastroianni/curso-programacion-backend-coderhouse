const express = require('express')
const { Router } = express
const routerShoppingCart = Router()

const CreateShoppingCartDto = require('../dtos/shopping_cart.dto.js').CreateShoppingCartDto;

const ShoppingCartService = require('../services/shopping_cart.service.js');
const shoppingCartService = new ShoppingCartService();

const validateIfAdmin = require('../middlewares/security.middleware.js');



routerShoppingCart.post("/:uuid/productos", async (req, res) => {
   const { uuid } = req.params;
   const { product_uuid } = req.body;
   const response = await shoppingCartService.addProduct(uuid, product_uuid);

   if(response){
      res.send(response);
   }else{
      res.send({error: 'carrito de compras no encontrado'});
   }
});

routerShoppingCart.delete("/:uuid/productos/:product_uuid", async (req, res) => {
   const { uuid, product_uuid } = req.params;
   const response = await shoppingCartService.deleteProduct(uuid, product_uuid);
   if(response){
      res.send(response);
   }else{
      res.send({error: 'carrito de compras no encontrado'});
   }
});

routerShoppingCart.get("/:uuid/productos", async (req, res) => {
   const { uuid } = req.params;
   const response = await shoppingCartService.getProducts(uuid);
   if(response){
      res.send(response);
   }else{
      res.send({error: 'carrito de compras no encontrado'});
   }
});


routerShoppingCart.post("/", async (req, res) => {
   const timestamp = new Date();
   const shoppingCart = new CreateShoppingCartDto(timestamp);
   const uuid = await shoppingCartService.create(shoppingCart);
   shoppingCart.uuid = uuid;
   res.send(shoppingCart);
});

routerShoppingCart.delete("/:uuid", async (req, res) => {
   const { uuid } = req.params;
   const deleted = await shoppingCartService.delete(uuid);
   if (deleted) {
      res.send({description:"carrito eliminado"});
   } else {
      res.send({error: 'carrito no encontrado'});
   }
});

module.exports = routerShoppingCart
