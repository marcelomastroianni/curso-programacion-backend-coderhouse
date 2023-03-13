# curso-programacion-backend-coderhouse-clase-16-desafio


## Docker Command:

Para levantar el contenedor de Mongodb se debe ejecutar el siguiente comando:

docker run --name mongodb -d -p 27017:27017  mongo



## Variables de entorno:

PORT: Puerto en el que se levanta la aplicacion.

FIREBASE_DATABASE_URL: URL de la base de datos de Firebase

FIREBASE_CONFIG_FILE: Nombre del archivo de configuracion para la base de datos de Firebase

MONGODB_DATABASE_URL: URL de la base de datos de Mongodb

TIPO_PERSISTENCIA: En esta variable se indica el tipo de persistencia. Valores posibles: archivo, memoria, mongodb o firebase.


## Correr test :

Antes de correr los test la aplicacion debe estar ejecutandose. Para levantar el servidor se debe ejecutar el siguiente comando:

node server.js

Para correr los test con mocha, chai y supertest se debe ejecutar el siguiente comando:

npm run test


Para correr los test de axios se debe ejecutar el siguiente comando:

npm run test-axios
