

/*
process.on('message', (cantidad_numeros) => {
    
    calcularNumerosRandom(cantidad_numeros);
});
*/

const calcularNumerosRandom = (cantidad_numeros) => {
    let numeros = {};
    
    for (let i = 0; i < cantidad_numeros; i++) {

        let numeroAleatorio = Math.floor(Math.random() * 1000) + 1;


        if (numeros[numeroAleatorio]) {
            numeros[numeroAleatorio].cantidad += 1;
        }
        else {
            numeros[numeroAleatorio] = { numero: numeroAleatorio, cantidad:1}
        }
    
    }
    return numeros;
    //process.send(numeros);
}   

module.exports = calcularNumerosRandom;


//console.log(calcularNumerosRandom(10000));

