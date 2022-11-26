

class ProductStore {

    constructor() {
        //this.datos = [];
    }


    //Connect database on port 6033
    connectToDataBase = async () => {
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


    getConnection = async () => {
        if(!this.connection){
            this.connection = await this.connectToDataBase();
        }
        return this.connection;
    }

    save = async (objeto) => {
        const knex = await this.getConnection();
        await knex('productos').insert(objeto);
    }

    getById = async (id) => {
        const knex = await this.getConnection();
        const productos = await knex.from('productos').select("*").where('id', id);
        return productos;
    }

    getAll = async () => {
        const knex = await this.getConnection();
        const productos = await knex.from('productos').select("*");
        return productos;
    }

    deleteById = async (id) => {
        const knex = await this.getConnection();
        await knex.from('productos').where('id', id).del();
    }

    deleteAll = async () => {
        const knex = await this.getConnection();
        await knex.from('productos').del();
    }

    updateById = async (id, objeto) => {
        const knex = await this.getConnection();
        await knex.from('productos').where('id', id).update(objeto);
    }

 }

const productStore = new ProductStore();

module.exports = productStore;
 