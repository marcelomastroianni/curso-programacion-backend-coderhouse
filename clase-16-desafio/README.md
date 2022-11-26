# curso-programacion-backend-coderhouse-clase-16-desafio


## Docker Compose Command

Para levantar el contenedor de MySql se debe ejecutar el siguiente comando:

docker-compose up -d

En la pagina http://localhost:8081/ se puede consultar las tablas de la base de datos de MySql.


En la pagina https://sqliteonline.com/ se pueden ver las tablas de la base de datos de Sqlite.

## Variables de entorno:

Si no se levanta el docker de MySql y se desea conectar a otra base de datos de MySql se deben cofigurar las siguietes variables de entorno en el archivo .env

MYSQL_USER

MYSQL_PASSWORD

MYSQL_DATABASE

MYSQL_HOST

MYSQL_PORT

Del mismo modo si se quiere cambiar la carpeta donde se guarda la base de datos de sqlite de los mensajes se debe cambiar las siguientes variables de entorno:

SQLITE_DATABASE_FOLDER

SQLITE_DATABASE