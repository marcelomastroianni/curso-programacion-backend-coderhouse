const express = require('express')

const { Router } = express

const randomGetController = require('../controllers/random.controller.js');




const getRouterRandom = async () => {

   const routerRandom = Router()

   routerRandom.get("/", randomGetController);

   return routerRandom;
}

module.exports = getRouterRandom
