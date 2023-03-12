const express = require('express')
const { Router } = express
const routerProductos = Router()

const validateIfAdmin = require('../middlewares/security.middleware.js');
const validateProduct = require('../middlewares/product.middleware.js');

const ProductController = require('../controllers/product.controller');
const productController = new ProductController();

routerProductos.get("/", productController.getAll);
routerProductos.get("/:uuid", productController.getOne);
routerProductos.post("/",validateProduct, productController.create);
routerProductos.put("/:uuid",validateProduct, productController.update);
routerProductos.delete("/:uuid", productController.delete);

module.exports = routerProductos
