const GenericStorage = require('./generic.store.js');

getConfigProductDataBase = async () => {
    var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user   : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
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

    knex.on('query', function(queryData) {
        console.log({sql: queryData.sql, bindings: queryData.bindings ? queryData.bindings.join(',') : ''});
     });

    return knex;

}

getProductStore = async () => {
    const configProductDataBase = await getConfigProductDataBase();
    const productStore = new GenericStorage(configProductDataBase,'productos');
    return productStore;
}

module.exports = getProductStore;



