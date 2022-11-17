
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routerProductos = require('./productos.js');
const messageStore = require('./messageStore');
const PORT = 8080;

const sendProductsToClient = async (products) => {
   //Send productos to client
   io.emit('new product', products);
}
routerProductos.setSendProductsToClient(sendProductsToClient);

const main = async () => {

   app.use(express.static('public'));
    
   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   //End Configuración de rutas

   io.on('connection', async (socket) => {

      //Send chat history to client when connect
      io.emit('all messages', await messageStore.getAll());

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
            await messageStore.save(msg);
            io.emit('all messages', await messageStore.getAll());
         }
      });
    });

   let server = http.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();