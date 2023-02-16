const ContenedorFirebase = require("../../contenedores/contenedor_firebase");



class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super("productos");
    }

}

module.exports = ProductosDaoFirebase;
