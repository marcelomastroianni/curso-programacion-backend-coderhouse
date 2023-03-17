
const express = require('express')
const app = express();
const http = require('http').Server(app);
const routerProductos = require('./routes/product.router.js');
const routerCarrito = require('./routes/shopping_cart.router.js');
const config = require('./config/config');

//Requires passport
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//End Requires passport

const logger = require('./logger/logger.js');

const getRouterUsers = require('./routes/user.router.js');



const main = async () => {


    //Configuracion de passport

    app.use(session({
        store: MongoStore.create({ mongoUrl: config.MONGODB_DATABASE_URL }),
        secret: config.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false
     }));
   
  
     app.use(passport.initialize());
  
     app.use(passport.session());
  
     //End Configuracion de passport

    
   app.use(express.static('public'));
    
   //Configuración de rutas
   const routerUsers = await getRouterUsers(passport,LocalStrategy);

   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   app.use('/api/carrito', routerCarrito);
   app.use('/api/users', routerUsers);

   //End Configuración de rutas



   let server = http.listen(config.PORT, function () {
       //console.log(`Server running on port ${config.PORT}`);
       logger.info(`Server running on port ${config.PORT}`);

   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();