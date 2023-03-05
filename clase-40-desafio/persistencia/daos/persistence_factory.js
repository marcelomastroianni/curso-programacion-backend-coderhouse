//import config from '../../config/config.js'
const config = require('../../config/config.js');
const UsuariosDaoMongo =  require('./usuarios_dao_mongodb.js');
const UsuariosDaoArchivo =  require('./usuarios_dao_archivo.js');
const MensajesDaoArchivo =  require('./mensajes_dao_archivo.js');
const MensajesDaoMongo =  require('./mensajes_dao_mongodb.js');


 class PersistenceFactory {
    static getPersistence = async(entidad) => {
        if (entidad == "usuarios") {
            switch(config.PERSISTENCE) {
                case "MONGODB":
                    return new UsuariosDaoMongo()
                case "FILE":
                    return new UsuariosDaoArchivo()
            }
        }
        else if (entidad == "mensajes") {
            switch(config.PERSISTENCE) {
                case "MONGODB":
                    return new MensajesDaoMongo()
                case "FILE":
                    return new MensajesDaoArchivo()
            }
        }
        
    }
}


module.exports = PersistenceFactory;