
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";


export class ProductosDaoArchivo extends ContenedorArchivo
{
    constructor() {
        super("productos.json");
    }
}
