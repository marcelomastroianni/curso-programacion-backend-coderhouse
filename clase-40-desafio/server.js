
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const getRouterProductosTest = require('./routes/product-test.router.js');
const getRouterUsers = require('./routes/user.router.js');
const getRouterRandom = require('./routes/random.router.js');
const getRouterInfo = require('./routes/info.router.js');
const compression = require('compression');

const dotenv = require('dotenv');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { normalize, denormalize, schema } = require( "normalizr");

const logger = require('./logger/logger.js');

const MensajesService = require('./service/mensajes.service.js');



const perform_normalize = (obj_mensajes) => {

    const authorSchema = new schema.Entity("authors");

    const mensajeSchema = new schema.Entity("mensajes", {
    author: authorSchema,
    }, { idAttribute: "uuid" });
 
 
    const globalSchema= new schema.Entity("global",{
       mensajes:[mensajeSchema]
     });


    const normalizedMensajes = normalize(obj_mensajes, globalSchema);
  
    return normalizedMensajes;
}



const main = async (PORT,MODO,SERVE_PUBLIC,COMPRESSION) => {

   //console.log("Modo: " + MODO);

   if (MODO == 'cluster'){
      const cluster = require('cluster');
      const numCPUs = require('os').cpus().length;
      if (cluster.isMaster) {
         logger.info(`Master ${process.pid} is running`);
         //console.log(`Master ${process.pid} is running`);
         // Fork workers.
         for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
         }
         cluster.on('exit', (worker, code, signal) => {
            logger.info(`worker ${worker.process.pid} died`);  
            //console.log(`worker ${worker.process.pid} died`);
         });
      } else {
         logger.info(`Worker ${process.pid} started`);
         //console.log(`Worker ${process.pid} started`);
         await startServer(PORT,SERVE_PUBLIC,COMPRESSION);
         //console.log(`Worker ${process.pid} finished`);
      }
   }
   else{
      //Fork
      logger.info(`Worker ${process.pid} started`);
      //console.log(`Worker ${process.pid} started`);
      await startServer(PORT,SERVE_PUBLIC,COMPRESSION);
      //console.log(`Worker ${process.pid} finished`);  
   }

}

const startServer = async (PORT,SERVE_PUBLIC,COMPRESSION) => {




   //Configuracion de dotenv
   dotenv.config();
   //End Configuracion de dotenv



   //Configuracion de passport

    app.use(session({
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_DATABASE_URL }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false
   }));
 

   app.use(passport.initialize());

   app.use(passport.session());

   //End Configuracion de passport


   const routerProductosTest = await getRouterProductosTest();

   const routerUsers = await getRouterUsers(passport,LocalStrategy);

   const routerRandom = await getRouterRandom();

   const routerInfo = await getRouterInfo();

   const mensajesService = new MensajesService();


   //Configuracion de express
   if (SERVE_PUBLIC){
      app.use(express.static('public'));
   }
   //End Configuracion de express


   //Configuracion compression gzip
   if (COMPRESSION){
      app.use(compression());
   }
   //End Configuracion compression gzip



   //Configuración de socket.io


   io.on('connection', async (socket) => {


      const array_mensajes = await mensajesService.getMensajes();
      const obj_mensajes = { id: "mensajes", mensajes: array_mensajes};
      io.emit('all messages', perform_normalize(obj_mensajes));

      //Save message to file storage and send all messages to client when receive a new message
      socket.on('chat message', async msg => {
         if (msg){
            try{
               msg.created_at = new Intl.DateTimeFormat('es-AR', { dateStyle: "short", timeStyle: "medium" }).format(new Date());  
            }
            catch(err){
               logger.error(err);
               msg.created_at = new Date();
               //console.log(err);
            }
            await mensajesService.saveMensaje(msg);

            const array_mensajes = await mensajesService.getMensajes();
            const obj_mensajes = { id: "mensajes", mensajes: array_mensajes};
            io.emit('all messages', perform_normalize(obj_mensajes));


         }
      });
    });

   
   //End configuración de socket.io
   



   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos-test', routerProductosTest);
   app.use('/api/users', routerUsers);
   app.use('/api/randoms', routerRandom);
   app.use('/api/info', routerInfo);

   //Configuración de rutas no implementadas
   app.all('*', (req, res) => {
      const { url, method } = req
      logger.warn(`Ruta ${method} ${url} no implementada`)
      res.send(`Ruta ${method} ${url} no está implementada`)
   });
   //End Configuración de rutas no implementadas

   //End Configuración de rutas


   let server = http.listen(PORT, function () {
       //console.log(`Server running on port ${PORT}`);
       logger.info(`Server running on port ${PORT}`);
   }
   );
   server.on("error", (error) => {
      logger.error(`Error en servidor ${error}`);
      //onsole.log(`Error en servidor ${error}`)
   });
}


const parseargv = require('minimist');
const args  = parseargv(process.argv.slice(2));

const PORT = args.port || 8080;
const MODO = args.modo || 'fork';

let SERVE_PUBLIC = true;

if (args.serve_public=="false"){
   SERVE_PUBLIC = false;
}

let COMPRESSION = false;

if (args.compression=="true"){
   SERVE_PUBLIC = true;
}



main(PORT,MODO,SERVE_PUBLIC,COMPRESSION);