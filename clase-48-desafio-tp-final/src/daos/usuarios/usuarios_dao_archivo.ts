
import { ContenedorArchivo } from "../../contenedores/contenedor_archivo";

export class UsuariosDaoArchivo extends ContenedorArchivo
{
    constructor() {
        super("data/usuarios.json");
    }
}
