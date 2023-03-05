# curso-programacion-backend-coderhouse-clase-24-desafio

## Variables de entorn

MONGO_URL: Url para la conexion a la base de datos para persistir las sesiones

SESSION_SECRET: Clave secreta para realizar la persistencia de las sesiones

SESSION_INACTIVITY_TIMEOUT_MINUTES: Tiempo de expiracion de la sesion en minutos

PERSISTENCE: Tipo de persistencia usado para los daos, valores posibles MONGODB o FILE


## Antes de levantar el proyecto:


### Debe haber una instancia de mongodb levantada localmente:

sudo 


docker run --name mongodb -d -p 27017:27017 mongo
## Para correr el proyecto:

node server.js --port 8082



## Una vez levantado el proyecto:

###  Para ir a la pagina principal:

GET
http://localhost:8082/


###  Para consultar la pagina de info:

GET
http://localhost:8082/info.html

###  Para probar el endpoint de generacion de numeros aleatorios:

GET
http://localhost:8082/api/randoms?cant=5000







