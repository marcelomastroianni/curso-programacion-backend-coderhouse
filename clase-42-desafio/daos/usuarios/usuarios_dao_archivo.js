const ContenedorArchivo = require("../../contenedores/contenedor_archivo");


class UsuariosDaoArhivo extends ContenedorArchivo
{
    constructor() {
        super("data/usuarios.json");
    }
}

module.exports = UsuariosDaoArhivo;