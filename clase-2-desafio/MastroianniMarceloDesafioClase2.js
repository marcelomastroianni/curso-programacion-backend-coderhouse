
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }  

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {    
        this.libros.push({nombre, autor});
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

const user = new Usuario('Marcelo', 'Mastroianni', [{nombre: 'El señor de los anillos', autor: 'J.R.R. Tolkien'}], ['Perro', 'Gato']);

console.log(user.getFullName());
console.log(user.countMascotas());
user.addMascota('Pez');
console.log(user.countMascotas());
user.addBook('El principito', 'Antoine de Saint-Exupéry');
console.log(user.getBookNames());
