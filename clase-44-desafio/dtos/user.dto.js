
class UserDto {

    constructor(user) {

        this.uuid = user.uuid;

        this.email = user.email;

        this.username = user.username;

        this.email = user.email;

        this.is_admin = user.is_admin;

    }

}

module.exports = UserDto;