var mongoose = require('mongoose');

const ContenedorMongoDB = require('../contenedores/contenedor_mongodb');

class MensajesDaoMongo extends ContenedorMongoDB {
    constructor() {
        const schema = new mongoose.Schema({
            id : mongoose.Schema.Types.ObjectId,
            uuid: String,
            author_id: String,
            author_nombre: String,
            author_apellido: String,
            author_edad: String,
            author_alias: String,
            author_avatar: String,
            text: String,
            created_at: String
        });
        const modelo = mongoose.model('mensajes', schema);
        super(modelo);
    }

    async getByUsername(username) {
        return await this.modelo.findOne({username: username});
    }
}

module.exports = MensajesDaoMongo;