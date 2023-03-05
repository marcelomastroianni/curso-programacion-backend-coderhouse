class MensajeDTO {
    constructor(mensajeEntity) {
        this.id = mensajeEntity.id;
        this.uuid = mensajeEntity.uuid;
        
        this.author = {}
        this.author.id = mensajeEntity.author_id;
        this.author.nombre = mensajeEntity.author_nombre;
        this.author.apellido = mensajeEntity.author_apellido;
        this.author.edad = mensajeEntity.author_edad;
        this.author.alias = mensajeEntity.author_alias;
        this.author.avatar = mensajeEntity.author_avatar;

        this.text = mensajeEntity.text;
        this.created_at = mensajeEntity.created_at;
    }
}

module.exports = MensajeDTO
