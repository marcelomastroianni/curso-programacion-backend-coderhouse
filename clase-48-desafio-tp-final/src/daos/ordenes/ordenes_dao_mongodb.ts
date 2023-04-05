var mongoose = require('mongoose');


import { ContenedorMongoDB } from '../../contenedores/contenedor_mongodb';

export class OrdenesDaoMongo extends ContenedorMongoDB {
    constructor() {

        var itemSchema = new mongoose.Schema({
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

        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            timestamp: String,
            email: String,
            status: String,
            products: [{}],
        });
        const modelo = mongoose.model('ordenes', schema);
        super(modelo);
    
    }
}
