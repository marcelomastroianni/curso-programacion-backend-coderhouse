
const ProductosDaoArchivo = require('./productos/productos_dao_archivo');
const ProductosDaoMemoria = require('./productos/productos_dao_memoria');
const CarritosDaoArchivo = require('./carritos/carritos_dao_archivo');
const CarritosDaoMemoria = require('./carritos/carritos_dao_memoria');


//Usamos el patron de diseño singleton para que solo exista una instancia de cada dao
let instanciaProductosDaoArchivo = null;
let instanciaProductosDaoMemoria = null;
let instanciaCarritosDaoArchivo = null;
let instanciaCarritosDaoMemoria = null;




const config = require('../config.js');


//Esta clase nos permite obtener una instancia de un dao en particular
//Tipo de persistencia desde variable de entorno

class DaoFactory {
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
        }
    }
}

module.exports = DaoFactory;
