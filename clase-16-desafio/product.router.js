const express = require('express')

const getProductStore = require('./product.store');

const { Router } = express






const getRouterProductos = async () => {

   const productStore = await getProductStore();

   const routerProductos = Router()

   const validateProduct = (req, res, next) => {
      const { title, price, thumbnail } = req.body;
      if (!title || !price || !thumbnail) {
         return res.status(400).json({ error: "faltan datos del producto" });
      }
      next();
   }   

   routerProductos.get("/", async (req, res) => {
      const data = await productStore.getAll();
      res.send(data);
   });

   routerProductos.get("/:id", async (req, res) => {
      const { id } = req.params;
      const allProducts = await productStore.getById(Number(id));
      const data = allProducts.find((product) => product.id === Number(id));
      if(data){
         res.send(data);
      }else{
         res.send({error: 'producto no encontrado'});
      }
   });

   routerProductos.post("/",validateProduct, async (req, res) => {
      const { title, price, thumbnail } = req.body;
      const data = await productStore.save({ title, price, thumbnail });
      //res.send({id:data,title, price, thumbnail});

      this.sendProductsToClient(await productStore.getAll());

      //res.redirect('/');
   });


   routerProductos.put("/:id",validateProduct, async (req, res) => {
      const { id } = req.params;
      const { title, price, thumbnail } = req.body;
      const data = await productStore.updateById(Number(id), { id:Number(id), title, price, thumbnail });
      if(data){
         res.send({id,title, price, thumbnail});
      }else{
         res.send({error: 'producto no encontrado'});
      }
   });


   routerProductos.delete("/:id", async (req, res) => {
      const { id } = req.params;
      const data = await productStore.getById(Number(id));
      if (data) {
         await productStore.deleteById(Number(id));
         res.send("producto eliminado");
      } else {
         res.send({error: 'producto no encontrado'});
      }
   });


   routerProductos.setSendProductsToClient = (sendProductsToClient)=>{
      this.sendProductsToClient = sendProductsToClient;
   };

   return routerProductos;
}

module.exports = getRouterProductos
