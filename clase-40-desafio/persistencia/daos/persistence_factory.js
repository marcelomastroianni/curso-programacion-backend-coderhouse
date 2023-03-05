//import config from '../../config/config.js'
const config = require('../../config/config.js');


 class PersistenceFactory {
    static getPersistence = async(entidad) => {
        if (entidad == "usuarios") {
            switch(config.PERSISTENCE) {
                case "MONGODB":{
                    const UsuariosDaoMongo =  require('./usuarios_dao_mongodb.js');
                    return new UsuariosDaoMongo()
                }
                case "FILE":{
                    const UsuariosDaoArchivo =  require('./usuarios_dao_archivo.js');
                    return new UsuariosDaoArchivo()
                }
            }
        }
        else if (entidad == "mensajes") {
            switch(config.PERSISTENCE) {
                case "MONGODB":{
                    const MensajesDaoMongo =  require('./mensajes_dao_mongodb.js');
                    return new MensajesDaoMongo()
                }
                case "FILE":{
                    const MensajesDaoArchivo =  require('./mensajes_dao_archivo.js');
                    return new MensajesDaoArchivo()
                }
            }
        }
        
    }
}


module.exports = PersistenceFactory;