
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

//GraphQL imports
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

//End GraphQL imports

const ProductService = require('./services/product.service');
const productService = new ProductService();
const CreateProductDto = require('./dtos/product.dto.js').CreateProductDto;
const UpdateProductDto = require('./dtos/product.dto.js').UpdateProductDto;


const schema = buildSchema(`
    type Query {
        hello: String
    }
`);


/*

query{
  hello
}

*/

const productSchema = buildSchema(`
    type Product {
        uuid: String
        name: String
        price: Float
        description: String
    }

    type Query {
        products: [Product]
    }

    type Mutation {
        createProduct(name: String!, price: Float!, description: String!): Product
    }
`);

/*

query{
  products {
    uuid
    name
    price
    description
  }
}

//Make a mutation with graphql
mutation{
    createProduct(name: "Producto desde graphql", 
                  price: 100, 
                  description: "Descripcion desde graphql"){
        uuid
        name
        price
        description
    }
}


*/


const main = async () => {


    //Configuracion de passport

    app.use(session({
        store: MongoStore.create({ mongoUrl: config.MONGODB_DATABASE_URL }),
        secret: config.SESSION_SECRET,
        resave: false,
        rolling: true,
        saveUninitialized: false
     }));
   
     const root = {
        hello: () => {
              return 'Hello world!';
        },

     };

     const rootProduct = {
        products: async () => {
            return await productService.getAll();
        },
        createProduct: async (args) => {
            const { name, price, description} = args;
            const timestamp = new Date();
            const product = new CreateProductDto(name, timestamp, description, "code", price, 0, "photo_url");
            const uuid = await productService.create(product);
            product.uuid = uuid;
            return product;
        }
     };


     app.use('/graphql', graphqlHTTP({
        schema: productSchema,
        rootValue: rootProduct,
        graphiql: true,
     }));

     /*
     app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
     }));
     */
  
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