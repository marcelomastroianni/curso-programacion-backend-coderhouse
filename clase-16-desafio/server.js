
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

const createDatabase = async () => {
   var knex = require('knex')({
      client: 'sqlite3',
      connection: { filename: './mydb.sqlite' }
    })

   
   //Create table if not exists
   await knex.schema.hasTable('mensajes').then(async (exists) => {
      if (!exists) {
         await knex.schema.createTable('mensajes', function (table) {
            table.increments('id');
            table.string('email');
            table.string('created_at');
            table.string('msg');
         });
      }
   });

   return knex;
}


//Insert message to database
messageStore.save = async (msg) => {
   const knex = await createDatabase();
   await knex('mensajes').insert(msg);
}


//Get all messages from database
messageStore.getAll = async () => {
   const knex = await createDatabase();
   const mensajes = await knex.from('mensajes').select("*");
   return mensajes;
}


//Connect database on port 6033
const createDatabaseMySql = async () => {
   var knex = require('knex')({
      client: 'mysql',
      connection: {
         host: 'localhost',
         port: 6033,
         user   : 'root',
         password : 'my_secret_password',
         database : 'app_db'
      }
      });

   //Create table productos if not exists
   await knex.schema.hasTable('productos').then(async (exists) => {
      if (!exists) {
         await knex.schema.createTable('productos', function (table) {
            table.increments('id');
            table.string('title');
            table.string('price');
            table.string('thumbnail');
         });
      }
   });

   return knex;

}


//Insert product to database
const saveProductToDatabase = async (product) => {
   const knex = await createDatabaseMySql();
   await knex('productos').insert(product);
}

routerProductos.setSaveProductToDatabase(saveProductToDatabase);

//Get all products from database
const getAllProductsFromDatabase = async () => {
   const knex = await createDatabaseMySql();
   const productos = await knex.from('productos').select("*");
   return productos;
}

routerProductos.setGetAllProductsFromDatabase(getAllProductsFromDatabase);



const main = async () => {

   app.use(express.static('public'));
    
   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   //End Configuración de rutas



   //Configuración base de datos
   const knex = await createDatabase();
   knex.on('query', function(queryData) {
      console.log({sql: queryData.sql, bindings: queryData.bindings ? queryData.bindings.join(',') : ''});
   });

   const knexMySql = await createDatabaseMySql();
   knexMySql.on('query', function(queryData) {
      console.log({sql: queryData.sql, bindings: queryData.bindings ? queryData.bindings.join(',') : ''});
   });
   //End Configuración base de datos


   //Configuración de socket.io

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