
const express = require('express')
const app = express();
const http = require('http').Server(app);
const routerProductos = require('./productos.router.js');
const PORT = process.env.PORT || 8080;



const main = async () => {

   app.use(express.static('public'));
    
   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   //End Configuración de rutas



   let server = http.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   server.on("error", (error) => console.log(`Error en servidor ${error}`));
}

main();