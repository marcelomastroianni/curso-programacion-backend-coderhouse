const ContenedorArchivo = require("../../contenedores/contenedor_archivo");


class ProductosDaoArhivo extends ContenedorArchivo
{
    constructor() {
        super("productos.txt");
    }
}

module.exports = ProductosDaoArhivo;