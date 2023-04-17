
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";

export class CarritosDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("carrito.json");
    }
}
