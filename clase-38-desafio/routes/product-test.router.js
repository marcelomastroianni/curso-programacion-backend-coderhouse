const express = require('express')
const { Router } = express
const auth = require('../middleware/auth.middleware.js');
const productTestGetController = require('../controllers/product-test.controller.js');




const getRouterProductosTest = async () => {

   const routerProductos = Router()

   routerProductos.get("/", auth, productTestGetController);

   return routerProductos;L
}

module.exports = getRouterProductosTest
