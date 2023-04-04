


import { ProductosDaoArchivo } from './productos/productos_dao_archivo';
import { ProductosDaoMemoria } from './productos/productos_dao_memoria';
import { ProductosDaoMongo } from './productos/productos_dao_mongodb';
import { CarritosDaoArchivo } from './carritos/carritos_dao_archivo';
import { CarritosDaoMemoria } from './carritos/carritos_dao_memoria';
import { CarritosDaoMongo } from './carritos/carritos_dao_mongodb';
import { UsuariosDaoArchivo } from './usuarios/usuarios_dao_archivo';
import { UsuariosDaoMemoria } from './usuarios/usuarios_dao_memoria';
import { UsuariosDaoMongo } from './usuarios/usuarios_dao_mongodb';

import { MensajesDaoArchivo } from './mensajes/mensajes_dao_archivo';
import { MensajesDaoMemoria } from './mensajes/mensajes_dao_memoria';
import { MensajesDaoMongo } from './mensajes/mensajes_dao_mongodb';



//Usamos el patron de diseño singleton para que solo exista una instancia de cada dao
let instanciaProductosDaoArchivo = null;
let instanciaProductosDaoMemoria = null;
let instanciaProductosDaoMongo = null;
let instanciaCarritosDaoArchivo = null;
let instanciaCarritosDaoMemoria = null;
let instanciaCarritosDaoMongo = null;
let instanciaUsuariosDaoArchivo = null;
let instanciaUsuariosDaoMemoria = null;
let instanciaUsuariosDaoMongo = null;

let instanciaMensajesDaoArchivo = null;
let instanciaMensajesDaoMemoria = null;
let instanciaMensajesDaoMongo = null;



//const config = require('../config/config.js');

import {config } from '../config/config';


//Esta clase nos permite obtener una instancia de un dao en particular
//Tipo de persistencia desde variable de entorno

export class DaoFactory {
    static getDao(tipo) {

 
        const tipoPersistencia = config.TIPO_PERSISTENCIA;
    
        if (tipo === 'productos') {
            if (tipoPersistencia === 'archivo') {
                if (!instanciaProductosDaoArchivo) {
                    instanciaProductosDaoArchivo = new ProductosDaoArchivo();
                }
                return instanciaProductosDaoArchivo;
            } else if (tipoPersistencia === 'memoria') {
                if (!instanciaProductosDaoMemoria) {
                    instanciaProductosDaoMemoria = new ProductosDaoMemoria();
                }
                return instanciaProductosDaoMemoria;
            }
            else if (tipoPersistencia === 'mongodb') {
                if (!instanciaProductosDaoMongo) {
                    instanciaProductosDaoMongo = new ProductosDaoMongo();
                }
                return instanciaProductosDaoMongo;
            }
          
            


        } else if (tipo === 'carritos') {
            if (tipoPersistencia === 'archivo') {
                if (!instanciaCarritosDaoArchivo) {
                    instanciaCarritosDaoArchivo = new CarritosDaoArchivo();
                }
                return instanciaCarritosDaoArchivo;
            } else if (tipoPersistencia === 'memoria') {
                if (!instanciaCarritosDaoMemoria) {
                    instanciaCarritosDaoMemoria = new CarritosDaoMemoria();
                }
                return instanciaCarritosDaoMemoria;
            }
            else if (tipoPersistencia === 'mongodb') {
                if (!instanciaCarritosDaoMongo) {
                    instanciaCarritosDaoMongo = new CarritosDaoMongo();
                }
                return instanciaCarritosDaoMongo;
            }
   
        } else if (tipo === 'usuarios') {
            if (tipoPersistencia === 'archivo') {
                if (!instanciaUsuariosDaoArchivo) {
                    instanciaUsuariosDaoArchivo = new UsuariosDaoArchivo();
                }
                return instanciaUsuariosDaoArchivo;
            } else if (tipoPersistencia === 'memoria') {
                if (!instanciaUsuariosDaoMemoria) {
                    instanciaUsuariosDaoMemoria = new UsuariosDaoMemoria();
                }
                return instanciaUsuariosDaoMemoria;
            }
            else if (tipoPersistencia === 'mongodb') {
                if (!instanciaUsuariosDaoMongo) {
                    instanciaUsuariosDaoMongo = new UsuariosDaoMongo();
                }
                return instanciaUsuariosDaoMongo;
            }

        }
        else if (tipo === 'mensajes') {
            if (tipoPersistencia === 'archivo') {
                if (!instanciaMensajesDaoArchivo) {
                    instanciaMensajesDaoArchivo = new MensajesDaoArchivo();
                }
                return instanciaMensajesDaoArchivo;
            } else if (tipoPersistencia === 'memoria') {
                if (!instanciaMensajesDaoMemoria) {
                    instanciaMensajesDaoMemoria = new MensajesDaoMemoria();
                }
                return instanciaMensajesDaoMemoria;
            }
            else if (tipoPersistencia === 'mongodb') {
                if (!instanciaMensajesDaoMongo) {
                    instanciaMensajesDaoMongo = new MensajesDaoMongo();
                }
                return instanciaMensajesDaoMongo;
            }

        }
    }
}

//module.exports = DaoFactory;
