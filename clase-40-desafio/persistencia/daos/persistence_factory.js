//import config from '../../config/config.js'
const config = require('../../config/config.js');


 class PersistenceFactory {

    static usuariosDao = null;
    static mensajesDao = null;


    static getPersistence = async(entidad) => {
        if (entidad == "usuarios") {
            switch(config.PERSISTENCE) {
                case "MONGODB":{
                    if (this.usuariosDao == null) {
                        const UsuariosDaoMongo =  require('./usuarios_dao_mongodb.js');
                        this.usuariosDao = new UsuariosDaoMongo();
                    }
                    return this.usuariosDao;
                }
                case "FILE":{
                    if (this.usuariosDao == null) {
                        const UsuariosDaoArchivo =  require('./usuarios_dao_archivo.js');
                        this.usuariosDao = new UsuariosDaoArchivo();
                    }
                    return this.usuariosDao;
                }
            }
        }
        else if (entidad == "mensajes") {
            switch(config.PERSISTENCE) {
                case "MONGODB":{
                    if (this.mensajesDao == null) {
                        const MensajesDaoMongo =  require('./mensajes_dao_mongodb.js');
                        this.mensajesDao = new MensajesDaoMongo();
                    }
                    return this.mensajesDao;
                }
                case "FILE":{
                    if (this.mensajesDao == null) {
                        const MensajesDaoArchivo =  require('./mensajes_dao_archivo.js');
                        this.mensajesDao = new MensajesDaoArchivo();
                    }
                    return this.mensajesDao;
                }
            }
        }
        
    }
}


module.exports = PersistenceFactory;