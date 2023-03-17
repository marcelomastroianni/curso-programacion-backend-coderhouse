const ContenedorFirebase = require("../../contenedores/contenedor_firebase");



class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super("carrito");
    }

}



module.exports = CarritosDaoFirebase;