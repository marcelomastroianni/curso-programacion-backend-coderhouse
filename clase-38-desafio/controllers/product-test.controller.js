const logger = require('../logger/logger.js');
const getProductosTestList = require('../service/product-test.service.js');


const productTestGetController = async (req, res) => {

    const { url, method } = req
    logger.info(`Ruta ${method} ${url}`)

    const dataList = await getProductosTestList();

    res.send(dataList);
 }


module.exports = productTestGetController
