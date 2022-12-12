var mongoose = require('mongoose');

const ContenedorMongoDB = require('../../contenedores/contenedor_mongodb');

class CarritosDaoMongo extends ContenedorMongoDB {
    constructor() {

        var itemSchema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            name: String,
            timestamp: String,
            description: String,
            code: String,
            price: Number,
            stock: Number,
            photo_url: String,
          });

        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            timestamp: String,
            product_list: [itemSchema],
        });
        const modelo = mongoose.model('carritos', schema);
        super(modelo);
    
    }
}

module.exports = CarritosDaoMongo;