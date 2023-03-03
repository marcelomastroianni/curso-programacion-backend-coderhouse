const express = require('express')
const { Router } = express
const infoGetController = require('../controllers/info.controller.js');
 

const getRouterInfo = async () => {

   const routerInfo = Router()

   routerInfo.get("/", infoGetController);

   return routerInfo;
}

module.exports = getRouterInfo
