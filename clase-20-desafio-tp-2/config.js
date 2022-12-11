const dotenv = require('dotenv');

//Configuracion de dotenv
dotenv.config();
//End Configuracion de dotenv

config = {
    PORT: process.env.PORT || 8080,
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'memoria'
}

module.exports = config;