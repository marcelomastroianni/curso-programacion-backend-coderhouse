const DataStore = require('./data.store');

class ProductService {

    constructor() {
        this.dataStore = new DataStore("productos.txt");
    }

    initDataStore = async () => {
        await this.dataStore.save({ name: "Escuadra", timestamp: new Date() ,description:"Descripcion Escuadra", code: "AAA", price: 123.45, stock:20, photo_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" });
        await this.dataStore.save({ name: "Calculadora", timestamp: new Date() , description:"Descripcion Calculadora", code: "BBB" , price: 234.56, stock:30, photo_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" });
        await this.dataStore.save({ name: "Globo Terráqueo", timestamp: new Date() , description:"Descripcion Globo Terráqueo", code:"CCC", price: 345.67,  stock:40, photo_url: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" });
    }

    getAll = async () => {
        const data = await this.dataStore.getAll();
        return data;
    }

    getOne = async (id) => {
        const data = await this.dataStore.getById(Number(id));
        return data;
    }


    create = async (name, timestamp, description, code, price, stock, photo_url) => {
        const id = await this.dataStore.save({ name, timestamp, description, code, price, stock, photo_url });
        return id;
    }


    update = async (id, name, description, code, price, stock, photo_url) => {
        const response = await this.dataStore.updateById(Number(id), { name, description, code, price, stock, photo_url });
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
