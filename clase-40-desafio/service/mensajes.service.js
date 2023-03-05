const PersistenceFactory =  require('../persistencia/daos/persistence_factory.js');
const MensajeEntity = require('../persistencia/entities/mensaje.entity.js');
const MensajeDTO = require('../persistencia/dtos/mensaje_dto.js');

const MensajesDaoMongo =  require('../persistencia/daos/mensajes_dao_mongodb.js');

class MensajesService {
    
    constructor() {
        this.init();
    }

    init = async () => {
        this.mensajesDao = await PersistenceFactory.getPersistence("mensajes");
    }

    getMensajes = async () => {
        let response = await this.mensajesDao.getAll();
        let responseDTO = response;
        if (this.mensajesDao instanceof MensajesDaoMongo){
            responseDTO = response.map(mensaje => new MensajeDTO(mensaje)); 
        }
        return responseDTO;
    }

    saveMensaje = async (mensajeDTO) => {
        return await this.mensajesDao.save(new MensajeEntity(mensajeDTO));
    }

}


module.exports = MensajesService;