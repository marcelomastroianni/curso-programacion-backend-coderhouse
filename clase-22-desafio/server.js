
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const getRouterProductosTest = require('./product-test.router.js');
const PORT = 8080;
const dotenv = require('dotenv');
const getMessageStore = require('./message.store.js');
const MensajesDaoArchivo = require('./daos/mensajes_dao_archivo.js');



const { normalize, denormalize, schema } = require( "normalizr");
const { inspect } = require('util');


const test_normalizr = async (mensajesDao) => {

   const array_mensajes = await mensajesDao.getAll();

   const obj_mensajes = { id: "mensajes", mensajes: array_mensajes};


   // Definimos un esquema de usuarios (autores y comentadores)
   const authorSchema = new schema.Entity("authors");

   // Definimos un esquema de artículos
   const mensajeSchema = new schema.Entity("mensajes", {
   author: authorSchema,
   }, { idAttribute: "uuid" });


   const globalSchema= new schema.Entity("global",{
      mensajes:[mensajeSchema]
    });

   /* ---------------------------------------------------------------------------------------- */

   function print(objeto) {
   console.log(inspect(objeto, false, 12, true))
   }

   console.log(' ------------- OBJETO ORIGINAL --------------- ')
   print(obj_mensajes)
   console.log(JSON.stringify(obj_mensajes).length)

   console.log(' ------------- OBJETO NORMALIZADO --------------- ')
   const normalizedMensajes = normalize(obj_mensajes, globalSchema);
   print(normalizedMensajes)
   console.log(JSON.stringify(normalizedMensajes).length)
   // 
   console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
   const denormalizedMensajes = denormalize(normalizedMensajes.result, globalSchema , normalizedMensajes.entities);
   print(denormalizedMensajes)
   console.log(JSON.stringify(denormalizedMensajes).length)



}











const main = async () => {


   //Configuracion de dotenv
   dotenv.config();
   //End Configuracion de dotenv


   const messageStore = await getMessageStore();
   const routerProductosTest = await getRouterProductosTest();

   const mensajesDao = new MensajesDaoArchivo();


   //Configuracion de express
   app.use(express.static('public'));
   //End Configuracion de express
    

   //Configuración de socket.io


   io.on('connection', async (socket) => {

      //Send chat history to client when connect
      //io.emit('all messages', await messageStore.getAll());
      io.emit('all messages', await mensajesDao.getAll());

      //Save message to file storage and send all messages to client when receive a new message
      socket.on('chat message', async msg => {
         if (msg){
            try{
               //msg.created_at = new Date().toLocaleDateString("es-AR",{dateStyle: 'short', timeStyle: 'medium'});
               msg.created_at = new Intl.DateTimeFormat('es-AR', { dateStyle: "short", timeStyle: "medium" }).format(new Date());  
            }
            catch(err){
               msg.created_at = new Date();
               console.log(err);
            }
            //await messageStore.save(msg);
            await mensajesDao.save(msg);
            //io.emit('all messages', await messageStore.getAll());
            io.emit('all messages', await mensajesDao.getAll());
         }
      });
    });

   
   //End configuración de socket.io
   

   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos-test', routerProductosTest);
   //End Configuración de rutas


   test_normalizr(mensajesDao);

   let server = http.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();