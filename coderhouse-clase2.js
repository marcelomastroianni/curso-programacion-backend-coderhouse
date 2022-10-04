

//1 funcion mostrar lista:


function mostrarLista(lista){
    if (!lista || lista.length==0){
        console.log("Lista vacia");
    } else {
        for(var i=0;i<lista.length;i++){
            console.log(`Elemento i ${i}= ${lista[i]}`);
        }
    }
}

mostrarLista([1,4,6,5]);

//2 funcion anonima a:

 ((lista) =>{
    if (!lista || lista.length==0){
        console.log("Lista vacia");
    } else {
        for(var i=0;i<lista.length;i++){
            console.log(`Elemento i ${i}= ${lista[i]}`);
        }
    }
})([6,7,8]);


//2 funcion anonima b:

(function(lista){
    if (!lista || lista.length==0){
        console.log("Lista vacia");
    } else {
        for(var i=0;i<lista.length;i++){
            console.log(`Elemento i ${i}= ${lista[i]}`);
        }
    }
})([6,7,8,9,10]);

//3 funcion crearMultiplicador:

function crearMultiplicador(numero){
    return function(param){
        return numero * param;
    }
}

var duplicar = crearMultiplicador(2);
var triplicar = crearMultiplicador(3);

console.log(duplicar(15));//30
console.log(triplicar(3));//9


