
const GenericStorage = require('./generic.store.js');

const fs = require("fs");


getConfigMessageDataBase = async () => {

   //Create database folder if not exists
   try{
       await fs.promises.mkdir(process.env.SQLITE_DATABASE_FOLDER);
   }
   catch(err){
       //console.log(err);
   }
   var knex = require('knex')({
   client: 'sqlite3',
   connection: { filename: process.env.SQLITE_DATABASE_FOLDER + process.env.SQLITE_DATABASE }
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

getMessageStore = async () => {
    const configMessageDataBase = await getConfigMessageDataBase();
    const messageStore = new GenericStorage(configMessageDataBase,'mensajes');
    return messageStore;
}



module.exports = getMessageStore;

