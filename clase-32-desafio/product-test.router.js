const express = require('express')

const { faker } = require('@faker-js/faker');

faker.locale = "es"

const { Router } = express


const auth = require('./auth.middleware.js');

const logger = require('./logger.js');



const getRouterProductosTest = async () => {



   const routerProductos = Router()


   routerProductos.get("/", auth, async (req, res) => {

      const { url, method } = req
      logger.info(`Ruta ${method} ${url}`)

      const dataList = [];

      for (let i = 0; i < 5; i++) {
         const data = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()

            /*
            tittle: faker.name.firstName(),
            price: 200,
            thumbnail: "https://picsum.photos/200/300"
            */
        
         }
         dataList.push(data);
      }

      res.send(dataList);
   });



   return routerProductos;
}

module.exports = getRouterProductosTest
