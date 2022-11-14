const fs = require("fs");



class MessageStorage{
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


const messageStorage = new MessageStorage("messages.txt");

module.exports = messageStorage;

