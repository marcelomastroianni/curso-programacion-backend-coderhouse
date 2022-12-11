const ProductService = require('./product.service');

//const CarritosDaoArchivo = require('./daos/carritos/carritos_dao_archivo');

const DaoFactory = require('./daos');
const config = require('./config');

class ShoppingCartService {

    constructor() {
        this.cartDao = DaoFactory.getDao('carritos',config.TIPO_PERSISTENCIA);
        //this.cartDao = new CarritosDaoArchivo();
        this.productService = new ProductService();
    }

    getOne = async (id) => {
        const data = await this.cartDao.getById(Number(id));
        return data;
    }

    create = async (shoppingCart) => {
        const id = await this.cartDao.save(shoppingCart);
        return id;
    }

    delete = async (id) => {
        const data = await this.cartDao.getById(Number(id));
        if (data) {
            await this.cartDao.deleteById(Number(id));
            return true;
        } else {
            return false;
        }
    }

    addProduct = async (id, product_id) => {
        const shoppingCart = await this.cartDao.getById(Number(id));
        const product = await this.productService.getOne(Number(product_id));
        if (shoppingCart && product) {
            product.stock = 1;
            if (shoppingCart.products) {
                const productIndex = shoppingCart.products.findIndex(p => p.id == product.id);
                if (productIndex >= 0) {
                    shoppingCart.products[productIndex].stock++;
                } else {
                    shoppingCart.products.push(product);
                }
            } 
            await this.cartDao.updateById(Number(id), shoppingCart);
            return shoppingCart;
        } else {
            return false;
        }
    }

    deleteProduct = async (id, product_id) => {
        const shoppingCart = await this.cartDao.getById(Number(id));
        if (shoppingCart) {
            const product = await this.productService.getOne(Number(product_id));
            if (product) {
                const index = shoppingCart.products.findIndex(p => p.id === product.id);
                if (index >= 0) {
                    shoppingCart.products.splice(index, 1);
                    await this.cartDao.updateById(Number(id), shoppingCart);
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

    getProducts = async (id) => {
        const shoppingCart = await this.cartDao.getById(Number(id));
        if (shoppingCart) {
            return shoppingCart.products;
        } else {
            return false;
        }
    }
}

module.exports = ShoppingCartService

