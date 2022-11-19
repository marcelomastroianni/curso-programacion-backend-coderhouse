const express = require('express')
const { Router } = express
const routerShoppingCart = Router()

const ShoppingCartDto = require('./shopping_cart.dto.js').ShoppingCartDto;
const CreateShoppingCartDto = require('./shopping_cart.dto.js').CreateShoppingCartDto;

const ShoppingCartService = require('./shopping_cart.service.js');
const shoppingCartService = new ShoppingCartService();



routerShoppingCart.get("/:id", async (req, res) => {
   const { id } = req.params;
   const data = await shoppingCartService.getOne(Number(id));
   if(data){
      res.send(data);
   }else{
      res.send({error: 'carrito no encontrado'});
   }
});

routerShoppingCart.post("/", async (req, res) => {
   const timestamp = new Date();
   const shoppingCart = new CreateShoppingCartDto(timestamp);
   const id = await shoppingCartService.create(shoppingCart);
   shoppingCart.id = id;
   res.send(shoppingCart);
});

routerShoppingCart.delete("/:id", async (req, res) => {
   const { id } = req.params;
   const deleted = await shoppingCartService.delete(Number(id));
   if (deleted) {
      res.send("carrito eliminado");
   } else {
      res.send({error: 'carrito no encontrado'});
   }
});

module.exports = routerShoppingCart
