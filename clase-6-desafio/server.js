var fs = require("fs");
var express = require("express");
var app = express();


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(object) {
        try {
            const data = await this.getAll();
            const id = data.length + 1;
            const newObject = { id, ...object };
            data.push(newObject);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.fileName, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            //Create file if not exists
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
            return JSON.parse("[]");
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            return data.find((object) => object.id === id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getAll();
            const newData = data.filter((object) => object.id !== id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
        } catch (error) {
            console.log(error);
        }
    }
}



const main = async () => {
    const contenedor = new Contenedor("productos.txt");

    await contenedor.save({ title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" });
    await contenedor.save({ title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" });
    await contenedor.save({ title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" });
   

    const PORT = 8080;

    var server = app.listen(PORT, function () {
        console.log(`Server running on port ${PORT}`);
    }
    );
    
    server.on("error", (error) => console.log(`Error en servidor ${error}`));
    
    
    app.get("/productos", async (req, res) => {
        const data = await contenedor.getAll();
        res.send(data);
    });

    app.get("/productoRandom", async (req, res) => {
        const data = await contenedor.getAll();
        const random = Math.floor(Math.random() * data.length);
        res.send(data[random]);
    });


}

main();


