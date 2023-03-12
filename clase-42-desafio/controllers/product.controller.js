
const CreateProductDto = require('../dtos/product.dto.js').CreateProductDto;
const UpdateProductDto = require('../dtos/product.dto.js').UpdateProductDto;
const ProductService = require('../services/product.service');


class ProductController {

   constructor() {
       this.productService = new ProductService();
   }

   getAll = async (req, res) => {
         const data = await this.productService.getAll();
         res.send(data);
   };

   getOne = async (req, res) => {
      const { uuid } = req.params;
      const data = await this.productService.getOne(uuid);
      if(data){
         res.send(data);
      }else{
         res.send({error: 'producto no encontrado'});
      }
   }

   create = async (req, res) => {
      const { name, description, code, price, stock, photo_url } = req.body;
      const timestamp = new Date();
      const product = new CreateProductDto(name, timestamp, description, code, price, stock, photo_url);
      const uuid = await this.productService.create(product);
      product.uuid = uuid;
      res.send(product);
   }

   update = async (req, res) => {
      const { uuid } = req.params;
      const { name, description, code, price, stock, photo_url } = req.body;
      const product = new UpdateProductDto(name, description, code, price, stock, photo_url);
      const response = await this.productService.update(uuid, product);
      if(response){
         res.send({uuid,...product});
      }else{
         res.send({error: 'producto no encontrado'});
      }
   }

   delete = async (req, res) => {
      const { uuid } = req.params;
      const deleted = await this.productService.delete(uuid);
      if (deleted) {
         res.send({description:"producto eliminado"});
      } else {
         res.send({error: 'producto no encontrado'});
      }
   }

}

module.exports = ProductController
