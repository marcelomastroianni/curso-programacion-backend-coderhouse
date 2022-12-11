const ContenedorArchivo = require("../../contenedores/contenedor_archivo");

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("carrito.txt");
    }
}

module.exports = CarritosDaoArchivo;