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
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
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
   const { title, price, thumbnail } = req.body;
   const id = await productService.create({ title, price, thumbnail });
   res.send({id,title, price, thumbnail});
});

routerProductos.put("/:id",validateProduct, async (req, res) => {
   const { id } = req.params;
   const { title, price, thumbnail } = req.body;
   const updated = await productService.update(Number(id), title, price, thumbnail);
   if(updated){
      res.send({id,title, price, thumbnail});
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
