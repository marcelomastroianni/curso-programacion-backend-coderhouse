
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";

export class OrdenesDaoArchivo extends ContenedorArchivo{
    constructor() {
        super("ordenes.json");
    }
}
