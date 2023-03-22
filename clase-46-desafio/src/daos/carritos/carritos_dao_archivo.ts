
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";

export class CarritosDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("data/carrito.json");
    }
}
