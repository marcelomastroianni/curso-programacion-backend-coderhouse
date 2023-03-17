const { v4: uuidv4 } = require('uuid');


class ContenedorMemoria {

    constructor() {
        this.datos = [];
    }

    async save(objeto) {
        let uuid = uuidv4();
        objeto.uuid = uuid;
        this.datos.push(objeto);
        return objeto.uuid;
    }

    async getById(uuid) {
        return this.datos.find((objeto) => objeto.uuid === uuid);
    }

    async getAll() {
        return this.datos;
    }

    async deleteById(uuid) {
        const index = this.datos.findIndex((objeto) => objeto.uuid === uuid);
        if (index === -1) {
            return null;
        }
        this.datos.splice(index, 1);//borra un elemento en la posicion index
        return true;
    }

    async deleteAll() {
        this.datos = [];
    }

    async updateById(uuid, objeto) {
        const index = this.datos.findIndex((objeto) => objeto.uuid === uuid);
        if (index === -1) {
            return null;
        }
        this.datos[index] = objeto;
        return true;
    }
 

 }



module.exports = ContenedorMemoria;
 