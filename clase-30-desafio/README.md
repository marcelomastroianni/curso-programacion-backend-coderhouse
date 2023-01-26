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

nodemon server.js --port 8082 --modo fork

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

nodemon server.js --port 8082 --modo cluster


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



# Pruebas Forever

Forever modo fork

forever server.js --port 8082 --modo fork

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ forever server.js --port 8082 --modo fork
<font color="#A2734C">warn</font>:    --minUptime not set. Defaulting to: 1000ms
<font color="#A2734C">warn</font>:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
(node:117736) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:117736) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
Worker 117751 started
Server running on port 8082
</pre>

</pre>

Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 117736 pts/0    00:00:00 <font color="#C01C28"><b>node</b></font>
 117751 pts/0    00:00:01 <font color="#C01C28"><b>node</b></font>
</pre>


<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ forever list
(node:117810) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:117810) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
<font color="#26A269">info</font>:    Forever processes running
<font color="#5E5C64">data</font>:    <font color="#D0CFCC">   </font> <font color="#D0CFCC">uid</font>  <font color="#5E5C64">command</font>       <font color="#5E5C64">script</font>                            <font color="#D0CFCC">forever</font> <font color="#D0CFCC">pid</font>    <font color="#D0CFCC">id</font> <font color="#A347BA">logfile</font>                         <font color="#A2734C">uptime</font>                  
<font color="#5E5C64">data</font>:    [0] tagK <font color="#5E5C64">/usr/bin/node</font> <font color="#5E5C64">server.js --port 8082 --modo fork</font> 117736  117751    <font color="#A347BA">/home/marcelo/.forever/tagK.log</font> <font color="#A2734C">0:0:1:7.501000000000005</font></pre>



Forever modo cluster

forever server.js --port 8082 --modo cluster

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ forever server.js --port 8082 --modo cluster
<font color="#A2734C">warn</font>:    --minUptime not set. Defaulting to: 1000ms
<font color="#A2734C">warn</font>:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
(node:117868) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:117868) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
Master 117879 is running
Worker 117886 started
Worker 117899 started
Worker 117906 started
Worker 117893 started
Worker 117920 started
Server running on port 8082
Server running on port 8082
Server running on port 8082
Worker 117887 started
Server running on port 8082
Server running on port 8082
Server running on port 8082
Worker 117913 started
Worker 117932 started
Server running on port 8082
Server running on port 8082
</pre>


Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 117868 pts/0    00:00:00 <font color="#C01C28"><b>node</b></font>
 117879 pts/0    00:00:01 <font color="#C01C28"><b>node</b></font>
 117886 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117887 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117893 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117899 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117906 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117913 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117920 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
 117932 pts/0    00:00:02 <font color="#C01C28"><b>node</b></font>
</pre>


<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ forever list
(node:118053) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:118053) Warning: Accessing non-existent property &apos;padLevels&apos; of module exports inside circular dependency
<font color="#26A269">info</font>:    Forever processes running
<font color="#5E5C64">data</font>:    <font color="#D0CFCC">   </font> <font color="#D0CFCC">uid</font>  <font color="#5E5C64">command</font>       <font color="#5E5C64">script</font>                               <font color="#D0CFCC">forever</font> <font color="#D0CFCC">pid</font>    <font color="#D0CFCC">id</font> <font color="#A347BA">logfile</font>                         <font color="#A2734C">uptime</font>       
<font color="#5E5C64">data</font>:    [0] Cn4N <font color="#5E5C64">/usr/bin/node</font> <font color="#5E5C64">server.js --port 8082 --modo cluster</font> 117868  117879    <font color="#A347BA">/home/marcelo/.forever/Cn4N.log</font> <font color="#A2734C">0:0:0:36.785</font></pre>


* Por lo que se ve el comando list de forever no lista los procesos workers cuando se corre la app en modo cluster.



# Pruebas pm2

Pm2 modo fork

pm2 start server.js -- --port 8082 --modo fork


<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 start server.js -- --port 8082 --modo fork
<font color="#26A269">[PM2] </font>Starting /home/marcelo/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio/server.js in fork_mode (1 instance)
<font color="#26A269">[PM2] </font>Done.
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 119012   <font color="#5E5C64">│</font> 0s     <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#26A269"><b>online</b></font>    <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 37.1mb   <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font></pre>



Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 119012 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
</pre>


<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 list
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 119012   <font color="#5E5C64">│</font> 3m     <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#26A269"><b>online</b></font>    <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 115.1mb  <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
</pre>



<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 stop all
<font color="#26A269">[PM2] </font>Applying action stopProcessId on app [all](ids: [ 0 ])
<font color="#26A269">[PM2] </font>[server](0) ✓
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 0        <font color="#5E5C64">│</font> 0      <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#C01C28"><b>stopped</b></font>   <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 0b       <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
<font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 list
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 0        <font color="#5E5C64">│</font> 0      <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#C01C28"><b>stopped</b></font>   <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 0b       <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
<font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 delete all
<font color="#26A269">[PM2] </font>Applying action deleteProcessId on app [all](ids: [ 0 ])
<font color="#26A269">[PM2] </font>[server](0) ✓
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
<font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 list
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
</pre>


Pm2 modo cluster

pm2 start server.js -- --port 8082 --modo cluster

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 start server.js -- --port 8082 --modo cluster
<font color="#26A269">[PM2] </font>Starting /home/marcelo/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio/server.js in fork_mode (1 instance)
<font color="#26A269">[PM2] </font>Done.
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 119439   <font color="#5E5C64">│</font> 0s     <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#26A269"><b>online</b></font>    <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 21.3mb   <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
</pre>


Procesos Node:

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 list
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 119439   <font color="#5E5C64">│</font> 13s    <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#26A269"><b>online</b></font>    <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 140.7mb  <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
</pre>

<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~</b></font>$ ps -e|grep node
 119439 ?        00:00:01 <font color="#C01C28"><b>node</b></font> /home/marc
 119454 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119455 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119461 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119467 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119474 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119481 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119488 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc
 119495 ?        00:00:02 <font color="#C01C28"><b>node</b></font> /home/marc</pre>



* Por lo que se ve el comando list de pm2 no lista los procesos workers cuando se corre la app en modo cluster.



<pre><font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 stop all
<font color="#26A269">[PM2] </font>Applying action stopProcessId on app [all](ids: [ 0 ])
<font color="#26A269">[PM2] </font>[server](0) ✓
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> 0   </b></font><font color="#5E5C64">│</font> server    <font color="#5E5C64">│</font> default     <font color="#5E5C64">│</font> 1.0.0   <font color="#5E5C64">│</font> <span style="background-color:#FFFFFF"><font color="#300A24"><b>fork</b></font></span>    <font color="#5E5C64">│</font> 0        <font color="#5E5C64">│</font> 0      <font color="#5E5C64">│</font> 0    <font color="#5E5C64">│</font> <font color="#C01C28"><b>stopped</b></font>   <font color="#5E5C64">│</font> 0%       <font color="#5E5C64">│</font> 0b       <font color="#5E5C64">│</font> <b>marcelo</b>  <font color="#5E5C64">│</font> <font color="#5E5C64">disabled</font> <font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
<font color="#26A269"><b>marcelo@marcelo-SmartPro-Q6</b></font>:<font color="#12488B"><b>~/Desktop/desarrollo/curso-programacion-backend-coderhouse-ssh/clase-30-desafio</b></font>$ pm2 delete all
<font color="#26A269">[PM2] </font>Applying action deleteProcessId on app [all](ids: [ 0 ])
<font color="#26A269">[PM2] </font>[server](0) ✓
<font color="#5E5C64">┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</font>
<font color="#5E5C64">│</font><font color="#2AA1B3"><b> id  </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> name      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> namespace   </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> version </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mode    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> pid      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> uptime </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> ↺    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> status    </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> cpu      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> mem      </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> user     </b></font><font color="#5E5C64">│</font><font color="#2AA1B3"><b> watching </b></font><font color="#5E5C64">│</font>
<font color="#5E5C64">└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</font>
</pre>