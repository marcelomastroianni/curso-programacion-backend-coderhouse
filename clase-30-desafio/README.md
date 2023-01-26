# curso-programacion-backend-coderhouse-clase-24-desafio

## Variables de entorno


MONGO_URL: Url para la conexion a la base de datos para persistir las sesiones

SESSION_SECRET: Clave secreta para realizar la persistencia de las sesiones

SESSION_INACTIVITY_TIMEOUT_MINUTES: Tiempo de expiracion de la sesion en minutos



## Antes de levantar el proyecto:


### Debe haber una instancia de mongodb levantada localmente:

sudo docker run --name mongodb -d -p 27017:27017 mongo



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



# Pruebas Nodemon

Nodemon Modo Fork:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ nodemon server.js --port 8082 --modo fork
<font color="#A2734C">[nodemon] 2.0.20</font>
<font color="#A2734C">[nodemon] to restart at any time, enter `rs`</font>
<font color="#A2734C">[nodemon] watching path(s): *.*</font>
<font color="#A2734C">[nodemon] watching extensions: js,mjs,json</font>
<font color="#26A269">[nodemon] starting `node server.js --port 8082 --modo fork`</font>
Worker 113147 started
Server running on port 8082
</pre>


Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 113134 pts/0    00:00:00 <font color="#C01C28"><b>node</b></font>
 113147 pts/0    00:00:01 <font color="#C01C28"><b>node</b></font>
</pre>

Nodemon Modo Cluster:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ nodemon server.js --port 8082 --modo cluster
<font color="#A2734C">[nodemon] 2.0.20</font>
<font color="#A2734C">[nodemon] to restart at any time, enter `rs`</font>
<font color="#A2734C">[nodemon] watching path(s): *.*</font>
<font color="#A2734C">[nodemon] watching extensions: js,mjs,json</font>
<font color="#26A269">[nodemon] starting `node server.js --port 8082 --modo cluster`</font>
Master 113431 is running
Worker 113445 started
Worker 113439 started
Worker 113478 started
Server running on port 8082
Worker 113472 started
Server running on port 8082
Worker 113458 started
Worker 113438 started
Worker 113465 started
Server running on port 8082
Server running on port 8082
Server running on port 8082
Server running on port 8082
Server running on port 8082
Worker 113451 started
Server running on port 8082
</pre>

Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 113418 pts/0    00:00:00 <font color="#C01C28"><b>node</b></font>
 113431 pts/0    00:00:01 <font color="#C01C28"><b>node</b></font>
 113438 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113439 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113445 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113451 pts/0    00:00:03 <font color="#C01C28"><b>node</b></font>
 113458 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113465 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113472 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 113478 pts/0    00:00:03 <font color="#C01C28"><b>node</b></font>
</pre>