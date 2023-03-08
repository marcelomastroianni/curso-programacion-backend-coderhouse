
const express = require('express')
const app = express();
const http = require('http').Server(app);
const routerProductos = require('./routes/product.router.js');
const routerCarrito = require('./routes/shopping_cart.router.js');





const config = require('./config/config');

const main = async () => {



   
  

   app.use(express.static('public'));
    
   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   app.use('/api/carrito', routerCarrito);
   //End Configuración de rutas



   let server = http.listen(config.PORT, function () {
       console.log(`Server running on port ${config.PORT}`);
   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();