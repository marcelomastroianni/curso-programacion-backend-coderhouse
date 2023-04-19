import * as dotenv from 'dotenv';
import * as path from 'path';


//Configuracion de dotenv

if (process.env.NODE_ENV === 'production') {
    dotenv.config();
} else if (process.env.NODE_ENV === 'development') {
    //dotenv.config({ path: 'env.dev' });
    dotenv.config({ path: path.resolve(__dirname, '../../.env.dev')});
}

//End Configuracion de dotenv

export let config = {
    PORT: process.env.PORT || 8080,
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'memoria',
    //FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    //FIREBASE_CONFIG_FILE: process.env.FIREBASE_CONFIG_FILE,
    MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL,
    //SESSION_SECRET: process.env.SESSION_SECRET
    SESION_EXPIRATION: process.env.SESION_EXPIRATION,
    SESION_SECRET: process.env.SESION_SECRET,
    //EMAIL
    MAIL_FROM:process.env.MAIL_FROM,
    MAIL_PASSWORD:process.env.MAIL_PASSWORD,
    MAIL_SERVICE_TYPE:process.env.MAIL_SERVICE_TYPE

}
