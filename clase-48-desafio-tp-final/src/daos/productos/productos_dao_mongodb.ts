var mongoose = require('mongoose');

import { ContenedorMongoDB } from '../../contenedores/contenedor_mongodb';

export class ProductosDaoMongo extends ContenedorMongoDB {
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
            category: String,
        });
        const modelo = mongoose.model('productos', schema);
        super(modelo);

    
    }
}
