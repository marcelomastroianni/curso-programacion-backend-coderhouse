const express = require('express')
const { Router } = express
const routerProductos = Router()

const CreateProductDto = require('../dtos/product.dto.js').CreateProductDto;
const UpdateProductDto = require('../dtos/product.dto.js').UpdateProductDto;
const ProductService = require('../services/product.service');
const productService = new ProductService();
const validateIfAdmin = require('../middlewares/security.middleware.js');



const validateProduct = (req, res, next) => {
   const { name, description, code, price, stock, photo_url } = req.body;
   if (!name || !description || !code || !price || !stock || !photo_url) {
         return res.status(400).json({ error: "faltan datos del producto" });
   }
   next();
}


routerProductos.get("/", async (req, res) => {
    const data = await productService.getAll();
    res.send(data);
});

routerProductos.get("/:uuid", async (req, res) => {
   const { uuid } = req.params;
   const data = await productService.getOne(uuid);
   if(data){
      res.send(data);
   }else{
      res.send({error: 'producto no encontrado'});
   }
});


routerProductos.post("/", validateIfAdmin,validateProduct, async (req, res) => {
   const { name, description, code, price, stock, photo_url } = req.body;
   const timestamp = new Date();
   const product = new CreateProductDto(name, timestamp, description, code, price, stock, photo_url);
   const uuid = await productService.create(product);
   product.uuid = uuid;
   res.send(product);
});


routerProductos.put("/:uuid",validateIfAdmin,validateProduct, async (req, res) => {
   const { uuid } = req.params;
   const { name, description, code, price, stock, photo_url } = req.body;
   const product = new UpdateProductDto(name, description, code, price, stock, photo_url);
   const response = await productService.update(uuid, product);
   if(response){
      res.send({uuid,...product});
   }else{
      res.send({error: 'producto no encontrado'});
   }
});


routerProductos.delete("/:uuid", validateIfAdmin, async (req, res) => {
   const { uuid } = req.params;
   const deleted = await productService.delete(uuid);
   if (deleted) {
      res.send({description:"producto eliminado"});
   } else {
      res.send({error: 'producto no encontrado'});
   }
});

module.exports = routerProductos