
const mongoose = require('mongoose');


class ContenedorMongoDB {
    constructor(modelo) {
        this.conectar();
        this.modelo = modelo;
    }

    async conectar() {
        try {
            await mongoose.connect('mongodb://localhost:27017/ecommerce', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Base de datos conectada');
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        return await this.modelo.find();
    }

    async getById(id) {
        return await this.modelo.findById(new mongo.ObjectID(id));
    }

    async save(object) {
        const newObject = new this.modelo(object);
        return await newObject.save();
    }
    
    async updateById(id, object) {
        return await this.modelo.findByIdAndUpdate(new mongo.ObjectID(id), object, {new: true});
    }  

    async deleteById(id) {
        return await this.modelo.findByIdAndDelete(new mongo.ObjectID(id));
    }

}

module.exports = ContenedorMongoDB;
