//const dotenv = require('dotenv');

import * as dotenv from 'dotenv';

//Configuracion de dotenv
dotenv.config();
//End Configuracion de dotenv

export let config = {
    PORT: process.env.PORT || 8080,
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'memoria',
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_CONFIG_FILE: process.env.FIREBASE_CONFIG_FILE,
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET
}
