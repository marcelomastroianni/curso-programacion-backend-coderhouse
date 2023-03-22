//import log4js from 'log4js'
const log4js = require('log4js');



log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoError: { type: 'file', filename: 'logs/error.log' },
    archivoWarn: { type: 'file', filename: 'logs/warn.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoError: {
      type: 'logLevelFilter',
      appender: 'archivoError',
      level: 'error',
    },
    loggerArchivoWarn: {
      type: 'logLevelFilter',
      appender: 'archivoWarn',
      level: 'warn',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola','loggerArchivoError', 'loggerArchivoWarn'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerArchivoError', 'loggerArchivoWarn'],
      level: 'all',
    },
  },
})

let instanciaLogger = null
let logger = null

/*if (process.env.NODE_ENV === 'production') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}*/

//logger = log4js.getLogger()

//export default logger


// singleton logger




class LoggerFactory {
    static getLogger() {
        if (!instanciaLogger) {
            instanciaLogger = log4js.getLogger()
        }
        return instanciaLogger;
    }
}


logger = LoggerFactory.getLogger();


module.exports = logger