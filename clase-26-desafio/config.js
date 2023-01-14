const dotenv = require('dotenv');

//Configuracion de dotenv
dotenv.config();
//End Configuracion de dotenv

config = {
    PORT: process.env.PORT || 8080,
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL
}

module.exports = config;