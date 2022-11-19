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
}

module.exports = ShoppingCartService

