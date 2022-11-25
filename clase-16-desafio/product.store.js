

class ProductStore {

    constructor() {
        //this.datos = [];
    }


    //Connect database on port 6033
    connectToDataBase = async () => {
        var knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 6033,
            user   : 'root',
            password : 'my_secret_password',
            database : 'app_db'
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
 