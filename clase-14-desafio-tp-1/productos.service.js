const DataStore = require('./data.store');

class ProductService {

    constructor() {
        this.dataStore = new DataStore("productos.txt");
    }

    initDataStore = async () => {
        await this.dataStore.save({ title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" });
        await this.dataStore.save({ title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" });
        await this.dataStore.save({ title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" });
    }

    getAll = async () => {
        const data = await this.dataStore.getAll();
        return data;
    }

    getOne = async (id) => {
        const data = await this.dataStore.getById(Number(id));
        return data;
    }

    create = async (title, price, thumbnail) => {
        const id = await this.dataStore.save({ title, price, thumbnail });
        return id;
    }

    update = async (id, title, price, thumbnail) => {
        const response = await this.dataStore.updateById(Number(id), { id:Number(id), title, price, thumbnail });
        return response;
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

module.exports = ProductService
