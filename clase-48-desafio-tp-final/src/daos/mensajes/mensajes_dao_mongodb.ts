var mongoose = require('mongoose');



import { ContenedorMongoDB } from '../../contenedores/contenedor_mongodb';


export class MensajesDaoMongo extends ContenedorMongoDB {

    modelo: any;

    constructor() {
        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            created_at: String,
            msg: String,
            email: String
        });
        const modelo = mongoose.model('mensajes', schema);
        super(modelo);
        this.modelo = modelo;

    
    }

  
}