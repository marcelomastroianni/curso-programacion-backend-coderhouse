const express = require('express')
const app = express();
const dataStore = require('./dataStore');
const routerProductos = require('./productos.js');

const PORT = 8080;


const main = async () => {


   //Configuración de pug

   app.set("view engine", "pug");
   app.set("views", "./views");
   app.use(express.static('public'));
    
   //End Configuración de pug

   
    app.get('/', async (req, res) => {
        res.redirect('/productos');
    });

    app.get('/productos', async (req, res) => {
        res.render('productList.pug', { products: (await dataStore.getAll())});
    });

    app.get('/alta-producto', async (req, res) => {
        res.render('productForm.pug', {});
    });

   //Configuración de rutas
   app.use(express.json());//para poder usar req.body
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);
   //End Configuración de rutas

   let server = app.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   
   server.on("error", (error) => console.log(`Error en servidor ${error}`));

}

main();



