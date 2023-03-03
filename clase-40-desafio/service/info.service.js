
const os = require('os')

const getInfoObject = () => {
    return {
       argumentosEntrada: process.argv.slice(2),
       nombrePlataforma: process.platform,
       versionNode: process.version,
       memoriaTotalReservada: process.memoryUsage().rss,
       pathEjecucion: process.execPath,//???
       processId: process.pid,
       carpetaProyecto: process.cwd(),
       numsCpu: os.cpus().length,
    }
}


module.exports = getInfoObject;



