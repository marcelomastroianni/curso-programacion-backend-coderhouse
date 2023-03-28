var mongoose = require('mongoose');



import { ContenedorMongoDB } from '../../contenedores/contenedor_mongodb';


export class UsuariosDaoMongo extends ContenedorMongoDB {

    modelo: any;

    constructor() {
        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            username: String,
            email: String,
            password: String,
            edad: Number,
            address: String,
            phone: String,
            alias: String,
            avatar: String,
            is_admin: Boolean

        });
        const modelo = mongoose.model('usuarios', schema);
        super(modelo);
        this.modelo = modelo;

    
    }

    async getByUsername(username) {
        return await this.modelo.findOne({username: username});
    }
}