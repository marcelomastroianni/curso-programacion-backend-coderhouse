var mongoose = require('mongoose');

const ContenedorMongoDB = require('../contenedores/contenedor_mongodb');

class UsuariosDaoMongo extends ContenedorMongoDB {
    constructor() {
        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            username: String,
            //email: String,
            password: String
        });
        const modelo = mongoose.model('usuarios', schema);
        super(modelo);
    }

    async getByUsername(username) {
        return await this.modelo.findOne({username: username});
    }
}

module.exports = UsuariosDaoMongo;