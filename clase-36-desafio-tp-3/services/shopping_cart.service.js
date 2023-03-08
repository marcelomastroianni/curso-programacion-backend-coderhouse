const ProductService = require('./product.service');

const DaoFactory = require('../daos');

class ShoppingCartService {

    constructor() {
        this.cartDao = DaoFactory.getDao('carritos');
        this.productService = new ProductService();
    }

    getOne = async (uuid) => {
        const data = await this.cartDao.getById(uuid);
        return data;
    }

    create = async (shoppingCart) => {
        const uuid = await this.cartDao.save(shoppingCart);
        return uuid;
    }

    delete = async (uuid) => {
        const data = await this.cartDao.getById(uuid);
        if (data) {
            await this.cartDao.deleteById(uuid);
            return true;
        } else {
            return false;
        }
    }

    addProduct = async (uuid, product_uuid) => {
        const shoppingCart = await this.cartDao.getById(uuid);
        const product = await this.productService.getOne(product_uuid);
        if (shoppingCart && product) {
            product.stock = 1;
            if (shoppingCart.products) {
                const productIndex = shoppingCart.products.findIndex(p => p.uuid == product.uuid);
                if (productIndex >= 0) {
                    shoppingCart.products[productIndex].stock++;
                } else {
                    shoppingCart.products.push(product);
                }
            } 
            await this.cartDao.updateById(uuid, shoppingCart);
            return shoppingCart;
        } else {
            return false;
        }
    }

    deleteProduct = async (uuid, product_uuid) => {
        const shoppingCart = await this.cartDao.getById(uuid);
        if (shoppingCart) {
            const product = await this.productService.getOne(product_uuid);
            if (product) {
                const index = shoppingCart.products.findIndex(p => p.uuid === product.uuid);
                if (index >= 0) {
                    shoppingCart.products.splice(index, 1);
                    await this.cartDao.updateById(uuid, shoppingCart);
                    return shoppingCart;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    getProducts = async (uuid) => {
        const shoppingCart = await this.cartDao.getById(uuid);
        if (shoppingCart) {
            return shoppingCart.products;
        } else {
            return false;
        }
    }
}

module.exports = ShoppingCartService

