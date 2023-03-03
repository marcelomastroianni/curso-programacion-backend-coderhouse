const calcularNumerosRandom = require('../service/random.service.js')
const logger = require('../logger/logger')
const CANTIDAD_NUMEROS_DEFAULT = 100000000;

const randomGetController = async (req, res) => {

    const { url, method } = req
    logger.info(`Ruta ${method} ${url}`)

    const count = req.query.cant || CANTIDAD_NUMEROS_DEFAULT;

    res.send(calcularNumerosRandom(count));
 
 }


module.exports = randomGetController