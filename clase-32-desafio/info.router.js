const express = require('express')

const os = require('os')

const { Router } = express


const logger = require('./logger')


const getInfoObject = () => {
    return {
       argumentosEntrada: process.argv.slice(2),
       nombrePlataforma: process.platform,
       versionNode: process.version,
       memoriaTotalReservada: process.memoryUsage().rss,
       pathEjecucion: process.execPath,//???
       processId: process.pid,
       carpetaProyecto: process.cwd(),
       numsCpu: os.cpus().length,
    }
 }
 



const getRouterInfo = async () => {



   const routerInfo = Router()

   routerInfo.get("/", async (req, res) => {

      const { url, method } = req
      logger.info(`Ruta ${method} ${url}`)

      res.send(getInfoObject());
   
   });



   return routerInfo;
}

module.exports = getRouterInfo
