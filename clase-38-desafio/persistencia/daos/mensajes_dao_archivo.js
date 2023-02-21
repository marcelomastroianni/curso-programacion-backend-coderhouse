const ContenedorArchivo = require("../contenedores/contenedor_archivo");

class MensajesDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("data/mensajes.json");
    }
}

module.exports = MensajesDaoArchivo;