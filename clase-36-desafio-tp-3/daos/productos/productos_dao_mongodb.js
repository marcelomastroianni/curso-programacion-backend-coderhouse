var mongoose = require('mongoose');

const ContenedorMongoDB = require('../../contenedores/contenedor_mongodb');

class ProductosDaoMongo extends ContenedorMongoDB {
    constructor() {
        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            name: String,
            timestamp: String,
            description: String,
            code: String,
            price: Number,
            stock: Number,
            photo_url: String,
        });
        const modelo = mongoose.model('productos', schema);
        super(modelo);

    
    }
}

module.exports = ProductosDaoMongo;