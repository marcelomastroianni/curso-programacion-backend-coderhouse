const logger = require('../logger/logger')

const getInfoObject = require('../service/info.service.js')




const infoGetController = async (req, res) => {

    const { url, method } = req
    logger.info(`Ruta ${method} ${url}`)

    res.send(getInfoObject());
 
 }


module.exports = infoGetController