

class UsuarioDTO {
    constructor(user) {
        this.uuid = user.uuid;
        this.username = user.username;
    }
}

module.exports = UsuarioDTO