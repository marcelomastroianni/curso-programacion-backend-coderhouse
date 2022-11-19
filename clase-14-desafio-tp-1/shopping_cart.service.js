const DataStore = require('./data.store');

class ShoppingCartService {

    constructor() {
        this.dataStore = new DataStore("carrito.txt");
    }

    getOne = async (id) => {
        const data = await this.dataStore.getById(Number(id));
        return data;
    }

    create = async (shoppingCart) => {
        const id = await this.dataStore.save(shoppingCart);
        return id;
    }

    delete = async (id) => {
        const data = await this.dataStore.getById(Number(id));
        if (data) {
            await this.dataStore.deleteById(Number(id));
            return true;
        } else {
            return false;
        }
    }

    addProduct = async (id, product_id) => {
        const shoppingCart = await this.dataStore.getById(Number(id));
        if (shoppingCart) {
            shoppingCart.products.push(product_id);
            await this.dataStore.updateById(Number(id), shoppingCart);
            return shoppingCart;
        } else {
            return false;
        }
    }

    deleteProduct = async (id, product_id) => {
        const shoppingCart = await this.dataStore.getById(Number(id));
        if (shoppingCart) {
            const index = shoppingCart.products.indexOf(product_id);
            if (index > -1) {
                shoppingCart.products.splice(index, 1);
            }
            await this.dataStore.updateById(Number(id), shoppingCart);
            return shoppingCart;
        } else {
            return false;
        }
    }

    getProducts = async (id) => {
        const shoppingCart = await this.dataStore.getById(Number(id));
        if (shoppingCart) {
            return shoppingCart.products;
        } else {
            return false;
        }
    }


}

module.exports = ShoppingCartService

