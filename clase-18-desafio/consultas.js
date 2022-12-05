//NoSQL MongoDb Querys

//Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
use ecommerce
db.createCollection("mensajes")
db.createCollection("productos")


//1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.
//
db.mensajes.insertMany([
    {
        "id": 1,
        "email": "mail@mail.com",
        "msg": "Mensaje 1",
        "created_at": "23/11/22 20:42:51"
    },
    {
        "id": 2,
        "email": "mail_2@mail.com",
        "msg": "Mensaje 2",
        "created_at": "24/11/22 20:42:51"
    },
    {
        "id": 3,
        "email": "mail_1@gmail.com",   
        "msg": "Mensaje 3",
        "created_at": "25/11/22 20:42:51"
    },
    {
        "id": 4,
        "email": "mail@mail.com",
        "msg": "Mensaje 4",
        "created_at": "26/11/22 20:42:51"
    },
    {
        "id": 5,
        "email": "mail_2@mail.com",
        "msg": "Mensaje 5",
        "created_at": "27/11/22 20:42:51"
    },
    {
        "id": 6,
        "email": "mail_1@gmail.com",   
        "msg": "Mensaje 6",
        "created_at": "28/11/22 20:42:51"
    },
    {
        "id": 7,
        "email": "mail_1@gmail.com",   
        "msg": "Mensaje 7",
        "created_at": "29/11/22 20:42:51"
    },
    {
        "id": 8,
        "email": "mail_1@gmail.com",   
        "msg": "Mensaje 8",
        "created_at": "30/11/22 20:42:51"
    },
    {
        "id": 9,
        "email": "mail_2@gmail.com",   
        "msg": "Mensaje 9",
        "created_at": "01/12/22 20:42:51"
    },
    {
        "id": 10,
        "email": "mail_3@gmail.com",   
        "msg": "Mensaje 10",
        "created_at": "02/12/22 20:42:51"
    }
]);

//2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

db.productos.insertMany([
    {
        "id": 1,
        "title": "Producto 1",
        "price": 120,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 2,
        "title": "Producto 2",
        "price": 580,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 3,
        "title": "Producto 3",
        "price": 900,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 4,
        "title": "Producto 4",
        "price": 1280, 
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 5,
        "title": "Producto 5",
        "price": 1700,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 6,
        "title": "Producto 6",
        "price": 2300,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 7,
        "title": "Producto 7",
        "price": 2860,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 8,
        "title": "Producto 8",
        "price": 3350,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 9,
        "title": "Producto 9",
        "price": 4320,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "id": 10,
        "title": "Producto 10",
        "price": 4990,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    }
]);



//3) Listar todos los documentos en cada colección.
db.mensajes.find()
db.productos.find()

//4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.mensajes.count()
db.productos.count()


//5) Realizar un CRUD sobre la colección de productos:

//Agregar un producto más en la colección de productos
db.productos.insertOne({
    "id": 11,
    "title": "Producto 11",
    "price": 1000,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
})

//Realizar una consulta por nombre de producto específico:
db.productos.find({title: "Producto 11"})


//Listar los productos con precio menor a 1000 pesos.
db.productos.find({price: {$lt: 1000}})


//Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({price: {$gt: 1000, $lt: 3000}})


//Listar los productos con precio mayor a 3000 pesos.
db.productos.find({price: {$gt: 3000}})


//Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find({},{title:1}).sort({price: 1}).skip(2).limit(1)


//Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({}, {$set: {stock: 100}})

//Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})


//Borrar los productos con precio menor a 1000 pesos
db.productos.deleteMany({price: {$lt: 1000}})


//6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
use ecommerce
db.createUser({user:"pepe",pwd:"asd456",roles:[{role:"read",db:"ecommerce"}]})

//Verificar que pepe no pueda cambiar la información.
use ecommerce
db.auth("pepe", "asd456")
db.productos.insertOne({
    "id": 12,
    "title": "Producto 12",
    "price": 1000,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
})






