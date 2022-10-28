const express = require('express')
const routerProductos = require('./productos.js');

const PORT = 8080;

const app = express();

const main = async () => {

   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));

   app.use(express.static('public'));

   app.use('/api/productos', routerProductos);

   let server = app.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   
   server.on("error", (error) => console.log(`Error en servidor ${error}`));


}

main();



