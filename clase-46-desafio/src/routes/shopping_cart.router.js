const express = require('express')
const { Router } = express
const routerShoppingCart = Router()


const ShoppingCartController = require('../controllers/shopping_cart.controller.js');
const shoppingCartController = new ShoppingCartController();

routerShoppingCart.post("/:uuid/productos", shoppingCartController.addProduct);
routerShoppingCart.delete("/:uuid/productos/:product_uuid", shoppingCartController.deleteProduct);
routerShoppingCart.get("/:uuid/productos", shoppingCartController.getProducts);
routerShoppingCart.post("/", shoppingCartController.create);
routerShoppingCart.delete("/:uuid", shoppingCartController.delete);

module.exports = routerShoppingCart
