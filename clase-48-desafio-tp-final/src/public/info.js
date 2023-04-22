
let txtMailFrom = document.getElementById('txtMailFrom');
let txtServiceType = document.getElementById('txtServiceType');
let txtMailTo = document.getElementById('txtMailTo');
let txtPort = document.getElementById('txtPort');
let txtPersistenceType = document.getElementById('txtPersistenceType');
let txtSesionExpiration = document.getElementById('txtSesionExpiration');

fetch('/api/config')
.then(response => response.json())
.then(info => {
  
  
    txtMailFrom.innerHTML = "MAIL_FROM: " + info.mail_from;
    txtServiceType.innerHTML = "MAIL_SERVICE_TYPE: " + info.mail_service_type;
    txtMailTo.innerHTML = "MAIL_TO: " + info.mail_to;
    txtPort.innerHTML = "PORT: " + info.port;
    txtPersistenceType.innerHTML = "TIPO_PERSISTENCIA: " + info.tipo_persistencia;
    txtSesionExpiration.innerHTML = "SESION_EXPIRATION: " + info.sesion_expiration;




});

