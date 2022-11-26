


class GenericStorage{
    constructor(knexConfig,tableName) {
        this.knex = knexConfig;
        this.tableName = tableName;
    }

    save = async (obj) => {
        await this.knex(this.tableName).insert(obj);
    }
    
    getAll = async () => {
        const lstObj = await this.knex.from(this.tableName).select("*");
        return lstObj;
    }


    getById = async (id) => {
        const obj = await this.knex.from(this.tableName).select("*").where('id', id);
        return obj;
    }
        
    deleteById = async (id) => {
        await this.knex.from(this.tableName).where('id', id).del();
    }


    deleteAll = async () => {
        await this.knex.from(this.tableName).del();
    }

    updateById = async (id, obj) => {
        await this.knex.from(this.tableName).where('id', id).update(obj);
    }
  
}

module.exports = GenericStorage;

