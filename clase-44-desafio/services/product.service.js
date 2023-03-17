const DaoFactory = require('../daos');


class ProductService {

    constructor() {
        
        this.productDao = DaoFactory.getDao('productos');
    }

    getAll = async () => {
        const data = await this.productDao.getAll();
        return data;
    }

    getOne = async (uuid) => {
        const data = await this.productDao.getById(uuid);
        return data;
    }

    create = async (product) => {
        const uuid = await this.productDao.save(product);
        return uuid;
    }

    update = async (uuid, product) => {
        const response = await this.productDao.updateById(uuid, product);
        return response;
    }

    delete = async (uuid) => {
        const data = await this.productDao.getById(uuid);
        if (data) {
            await this.productDao.deleteById(uuid);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ProductService
