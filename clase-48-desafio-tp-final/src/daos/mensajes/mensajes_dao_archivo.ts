
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";

export class MensajesDaoArchivo extends ContenedorArchivo
{
    constructor() {
        super("mensajes.json");
    }
}
