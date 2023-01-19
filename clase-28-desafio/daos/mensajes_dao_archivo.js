const ContenedorArchivo = require("../contenedores/contenedor_archivo");

class MensajesDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("mensajes.json");
    }
}

module.exports = MensajesDaoArchivo;