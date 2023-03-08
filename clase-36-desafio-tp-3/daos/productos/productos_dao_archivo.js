const ContenedorArchivo = require("../../contenedores/contenedor_archivo");


class ProductosDaoArhivo extends ContenedorArchivo
{
    constructor() {
        super("data/productos.json");
    }
}

module.exports = ProductosDaoArhivo;