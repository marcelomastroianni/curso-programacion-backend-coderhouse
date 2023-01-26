const express = require('express')

const { Router } = express

const calcularNumerosRandom = require('./random.process.js')


//const {fork} = require('child_process');

const CANTIDAD_NUMEROS_DEFAULT = 100000000;


const getRouterRandom = async () => {



   const routerRandom = Router()

   routerRandom.get("/", async (req, res) => {


      //const forked = fork('random.process.js');
      const count = req.query.cant || CANTIDAD_NUMEROS_DEFAULT;

      res.send(calcularNumerosRandom(count));
      //forked.send(count);

      /*forked.on('message', (numeros) => {
         //console.log(numeros);
         res.send(numeros);
      });*/
   

   });



   return routerRandom;
}

module.exports = getRouterRandom
