
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const getRouterProductos = require('./product.router.js');
const getRouterProductosTest = require('./product-test.router.js');
const PORT = 8080;
const dotenv = require('dotenv');

const getMessageStore = require('./message.store.js');






const main = async () => {


   //Configuracion de dotenv
   dotenv.config();
   //End Configuracion de dotenv


   const messageStore = await getMessageStore();

   const routerProductos = await getRouterProductos();
   const routerProductosTest = await getRouterProductosTest();


   //Configuracion de express
   app.use(express.static('public'));
   //End Configuracion de express
    

   //Configuración de socket.io

   const sendProductsToClient = async (products) => {
      //Send productos to client
      io.emit('new product', products);
   }
   routerProductos.setSendProductsToClient(sendProductsToClient);


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

   
   //End configuración de socket.io
   

   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   app.use('/api/productos-test', routerProductosTest);
   //End Configuración de rutas


   let server = http.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();