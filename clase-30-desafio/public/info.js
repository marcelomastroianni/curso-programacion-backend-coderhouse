
let txtArgumentosEntrada = document.getElementById('txtArgumentosEntrada');
let txtNombrePlataforma = document.getElementById('txtNombrePlataforma');
let txtVersionNode = document.getElementById('txtVersionNode');
let txtMemoriaTotalReservada = document.getElementById('txtMemoriaTotalReservada');
let txtPathEjecucion = document.getElementById('txtPathEjecucion');
let txtProcessId = document.getElementById('txtProcessId');
let txtCarpetaProyecto = document.getElementById('txtCarpetaProyecto');
let txtCantidadCPUs = document.getElementById('txtCantidadCPUs');

fetch('/api/info')
.then(response => response.json())
.then(info => {
  
  
    txtArgumentosEntrada.innerHTML = "Argumentos entrada: " + info.argumentosEntrada;
    txtNombrePlataforma.innerHTML = "Nombre plataforma: " + info.nombrePlataforma;
    txtVersionNode.innerHTML = "Versión Node: " + info.versionNode;
    txtMemoriaTotalReservada.innerHTML = "Memoria total reservada: " + info.memoriaTotalReservada;
    txtPathEjecucion.innerHTML = "Path ejecución: " + info.pathEjecucion;
    txtProcessId.innerHTML = "Process ID: " + info.processId;
    txtCarpetaProyecto.innerHTML = "Carpeta proyecto: " + info.carpetaProyecto;
    txtCantidadCPUs.innerHTML = "Cantidad CPUs: " + info.numsCpu;
    


});

