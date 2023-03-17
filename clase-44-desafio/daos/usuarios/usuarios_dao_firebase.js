const ContenedorFirebase = require("../../contenedores/contenedor_firebase");



class UsuariosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super("usuarios");
    }

}

module.exports = UsuariosDaoFirebase;
