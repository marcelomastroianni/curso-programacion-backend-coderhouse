const DaoFactory = require('./daos');


class ProductService {

    constructor() {
        
        this.productDao = DaoFactory.getDao('productos');
    }

    getAll = async () => {
        const data = await this.productDao.getAll();
        return data;
    }

    getOne = async (id) => {
        const data = await this.productDao.getById(Number(id));
        return data;
    }

    create = async (product) => {
        const id = await this.productDao.save(product);
        return id;
    }

    update = async (id, product) => {
        const response = await this.productDao.updateById(Number(id), product);
        return response;
    }

    delete = async (id) => {
        const data = await this.productDao.getById(Number(id));
        if (data) {
            await this.productDao.deleteById(Number(id));
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ProductService
