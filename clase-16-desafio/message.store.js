const fs = require("fs");


class MessageStorage{
    constructor(fileName) {
        this.fileName = fileName;
    }

    connectToDataBase = async () => {
        var knex = require('knex')({
        client: 'sqlite3',
        connection: { filename: './mydb.sqlite' }
        })

        //Create table if not exists
        await knex.schema.hasTable('mensajes').then(async (exists) => {
        if (!exists) {
            await knex.schema.createTable('mensajes', function (table) {
                table.increments('id');
                table.string('email');
                table.string('created_at');
                table.string('msg');
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
 
    save = async (msg) => {
        const knex = await this.getConnection();
        await knex('mensajes').insert(msg);
    }
    
    getAll = async () => {
        const knex = await this.getConnection();
        const mensajes = await knex.from('mensajes').select("*");
        return mensajes;
    }


    getById = async (id) => {
        const knex = await this.getConnection();
        const mensajes = await knex.from('mensajes').select("*").where('id', id);
        return mensajes;
    }
        
    deleteById = async (id) => {
        const knex = await this.getConnection();
        await knex.from('mensajes').where('id', id).del();
    }


    deleteAll = async () => {
        const knex = await this.getConnection();
        await knex.from('mensajes').del();
    }

    updateById = async (id, msg) => {
        const knex = await this.getConnection();
        await knex.from('mensajes').where('id', id).update(msg);
    }
  
}


const messageStorage = new MessageStorage("messages.txt");

module.exports = messageStorage;

