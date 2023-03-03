//import config from '../../config/config.js'
const config = require('../../config/config.js');
const UsuariosDaoMongo =  require('./usuarios_dao_mongodb.js');
const UsuariosDaoArchivo =  require('./usuarios_dao_archivo.js');



 class PersistenceFactory {
    static getPersistence = async() => {
        switch(config.PERSISTENCE) {
            case "MONGODB":
                //let {default: UsuariosDaoMongo} = await import('./usuarios_dao_mongodb.js')
                return new UsuariosDaoMongo()
            case "FILE":
                //let {default: UsuariosDaoArchivo} = await import('./usuarios_dao_archivo.js')
                return new UsuariosDaoArchivo()
        }
    }
}


module.exports = PersistenceFactory;