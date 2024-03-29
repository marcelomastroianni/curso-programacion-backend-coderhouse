
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

const CreateShoppingCartDto = require('./dtos/shopping_cart.dto.js').CreateShoppingCartDto;
const ShoppingCartService = require('./services/shopping_cart.service.js');
const shoppingCartService = new ShoppingCartService();


const schema = buildSchema(`
    type Product {
        uuid: String
        name: String
        price: Float
        description: String
        code: String
        stock: Int
        photo_url: String
    }

    type Cart {
        uuid: String
        timestamp: String
        products: [Product]
    }

    type Query {
        products: [Product]
        product(uuid: String!): Product

        cart(uuid: String!): Cart
        productsFromCart(uuid: String!): [Product]

    }

    type Mutation {
        createProduct(name: String!, price: Float!, description: String!, code:String,stock:Int, photo_url:String): Product
        updateProduct(uuid: String!, name: String!, price: Float!, description: String!, code:String,stock:Int, photo_url:String): Product
        deleteProduct(uuid: String!): String

        createCart: Cart
        addProductToCart(uuid: String!, product_uuid: String!): Cart
        deleteProductFromCart(uuid: String!, product_uuid: String!): Cart
        deleteCart(uuid: String!): String
    }
`);


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
        products: async () => {
            return await productService.getAll();
        },
        product: async (args) => {
            const {uuid} = args;
            return await productService.getOne(uuid);
        },
        createProduct: async (args) => {
            const {name, description, code, price, stock, photo_url} = args;
            const timestamp = new Date();
            const product = new CreateProductDto(name, timestamp, description, code, price, stock, photo_url);
            const uuid = await productService.create(product);
            product.uuid = uuid;
            return product;
        },
        updateProduct: async (args) => {
      
            const {uuid, name, description, code, price, stock, photo_url} = args;
            const product = new UpdateProductDto(name, description, code, price, stock, photo_url);
            let response = null;
            try{
                response = await productService.update(uuid, product);            }
            catch(err){
                console.log("err",err);
            }
            if (response) {
                product.uuid = uuid;
                return product;
            } else {
                return null;
            }
        },
        deleteProduct: async (args) => {
            const {uuid} = args;
            const response = await productService.delete(uuid);
            if (response) {
                return uuid;
            } else {
                return '';
            }
        },
        createCart: async () => {
            const timestamp = new Date();
            const shoppingCart = new CreateShoppingCartDto(timestamp);
            const uuid = await shoppingCartService.create(shoppingCart);
            shoppingCart.uuid = uuid;
            return shoppingCart;
        },
        addProductToCart: async (args) => {
            const {uuid, product_uuid} = args;
            const response = await shoppingCartService.addProduct(uuid, product_uuid);
            if (response) {
                return response;
            } else {
                return null;
            }
        },
        deleteProductFromCart: async (args) => {
            const {uuid, product_uuid} = args;
            const response = await shoppingCartService.deleteProduct(uuid, product_uuid);
            if (response) {
                return response;
            } else {
                return null;
            }
        },
        productsFromCart: async (args) => {
            const {uuid} = args;
            const response = await shoppingCartService.getProducts(uuid);
            if (response) {
                return response;
            } else {
                return null;
            }
        },
        deleteCart: async (args) => {
            const {uuid} = args;
            const response = await shoppingCartService.delete(uuid);
            if (response) {
                return "carrito eliminado";
            } else {
                return '';
            }
        }

     };


     app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
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