
import { ContenedorMemoria } from '../../contenedores/contenedor_memoria';



export class UsuariosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super();
    }

    async getByUsername(username) {
        const usuarios = await this.getAll();
        return usuarios.find((usuario) => usuario.username === username);
    }
    
}
