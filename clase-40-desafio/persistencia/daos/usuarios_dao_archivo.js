const ContenedorArchivo = require("../contenedores/contenedor_archivo");

class UsuariosDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("data/usuarios.json");
    }

   

}

module.exports = UsuariosDaoArchivo;