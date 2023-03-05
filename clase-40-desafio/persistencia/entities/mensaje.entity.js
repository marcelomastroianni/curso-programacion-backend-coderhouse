class MensajeEntity {
    constructor(mensajeDTO) {
        this.id = mensajeDTO.id;
        this.uuid = mensajeDTO.uuid;
        this.author_id = mensajeDTO.author.id;
        this.author_nombre = mensajeDTO.author.nombre;
        this.author_apellido = mensajeDTO.author.apellido;
        this.author_edad = mensajeDTO.author.edad;
        this.author_alias = mensajeDTO.author.alias;
        this.author_avatar = mensajeDTO.author.avatar;
        this.text = mensajeDTO.text;
        this.created_at = mensajeDTO.created_at;
    }
}

module.exports = MensajeEntity