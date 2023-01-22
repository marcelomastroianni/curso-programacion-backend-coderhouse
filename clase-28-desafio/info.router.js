const express = require('express')

const { Router } = express


const getInfoObject = () => {
    return {
       argumentosEntrada: process.argv.slice(2),
       nombrePlataforma: process.platform,
       versionNode: process.version,
       memoriaTotalReservada: process.memoryUsage().rss,
       pathEjecucion: process.execPath,//???
       processId: process.pid,
       carpetaProyecto: process.cwd()
    }
 }
 



const getRouterInfo = async () => {



   const routerInfo = Router()

   routerInfo.get("/", async (req, res) => {

    res.send(getInfoObject());
   
   });



   return routerInfo;
}

module.exports = getRouterInfo
