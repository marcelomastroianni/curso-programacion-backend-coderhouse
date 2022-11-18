const express = require('express')
const { Router } = express
const routerProductos = Router()


const ProductService = require('./productos.service');
const productService = new ProductService();

const initDataStore = async () => {

   await productService.initDataStore();
}

initDataStore();

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

routerProductos.get("/:id", async (req, res) => {
   const { id } = req.params;
   const data = await productService.getOne(Number(id));
   if(data){
      res.send(data);
   }else{
      res.send({error: 'producto no encontrado'});
   }
});


routerProductos.post("/",validateProduct, async (req, res) => {
   const { name, description, code, price, stock, photo_url } = req.body;
   const timestamp = new Date();
   const id = await productService.create(name, timestamp, description, code, price, stock, photo_url );
   res.send({id,name, timestamp, description, code, price, stock, photo_url});
});


routerProductos.put("/:id",validateProduct, async (req, res) => {
   const { id } = req.params;
   const { name, description, code, price, stock, photo_url } = req.body;
   const response = await productService.update(Number(id),  name, description, code, price, stock, photo_url );
   if(response){
      res.send({id,name, description, code, price, stock, photo_url});
   }else{
      res.send({error: 'producto no encontrado'});
   }
});


routerProductos.delete("/:id", async (req, res) => {
   const { id } = req.params;
   const deleted = await productService.delete(Number(id));
   if (deleted) {
      res.send("producto eliminado");
   } else {
      res.send({error: 'producto no encontrado'});
   }
});

module.exports = routerProductos
