
//const mongoose = require('mongoose');

import * as mongoose from 'mongoose';

//const { v4: uuidv4 } = require('uuid');
import {v4 as uuidv4} from 'uuid';

//const config = require('../config/config.js');

import {config} from '../config/config.js';
 

export class ContenedorMongoDB {
    modelo: any;
    constructor(modelo) {
        this.conectar();
        this.modelo = modelo;
    }

    async conectar() {
        try {
            await mongoose.connect(config.MONGODB_DATABASE_URL, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true
            });
            //console.log('Base de datos conectada');
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        return await this.modelo.find();
    }

    async getById(uuid){
        return await this.modelo.findOne({uuid: uuid});
    }

    async save(object) {
        let uuid = uuidv4();
        object.uuid = uuid;
        const newObject = new this.modelo(object);
        await newObject.save();
        return uuid;
    }
    

    async updateById(uuid, object) {
        return await this.modelo.findOneAndUpdate({uuid: uuid}, object, {new: true});
    }


    async deleteById(uuid) {
        return await this.modelo.findOneAndDelete({uuid: uuid});
    }

}
