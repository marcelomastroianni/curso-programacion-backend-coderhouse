# curso-programacion-backend-coderhouse-clase-44-desafio


## Docker Command:

Para levantar el contenedor de Mongodb se debe ejecutar el siguiente comando:

docker run --name mongodb -d -p 27017:27017  mongo



## Variables de entorno:

PORT: Puerto en el que se levanta la aplicacion.

FIREBASE_DATABASE_URL: URL de la base de datos de Firebase

FIREBASE_CONFIG_FILE: Nombre del archivo de configuracion para la base de datos de Firebase

MONGODB_DATABASE_URL: URL de la base de datos de Mongodb

TIPO_PERSISTENCIA: En esta variable se indica el tipo de persistencia. Valores posibles: archivo, memoria, mongodb o firebase.


## Correr aplicacion:

node server.js

Para correr la aplicacion en modo admin se debe registrarse y loguearse con un usuario del tipo admin.

http://localhost:8080/

De lo contrario no se podrian dar de alta productos o modificarlos.
