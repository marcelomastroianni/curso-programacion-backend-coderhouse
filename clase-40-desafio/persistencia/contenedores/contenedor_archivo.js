const fs = require("fs");

const { v4: uuidv4 } = require('uuid');

const logger = require("../../logger/logger.js");

class ContenedorArchivo {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(object) {
        try {
            const data = await this.getAll();
            let uuid = uuidv4();
            const newObject = { uuid, ...object };
            data.push(newObject);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
            return uuid;
        } catch (error) {
            logger.error(error);
            //console.log(error);
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

    async getById(uuid) {
        try {
            const data = await this.getAll();
            return data.find((object) => object.uuid === uuid);
        } catch (error) {
            logger.error(error);
            //console.log(error);
        }
    }

    async getByUsername(username) {
        try {
            const data = await this.getAll();
            return data.find((object) => object.username === username);
        } catch (error) {
            logger.error(error);
            //console.log(error);
        }
    }


    async deleteById(uuid) {
        try {
            const data = await this.getAll();
            const newData = data.filter((object) => object.uuid !== uuid);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2));
        } catch (error) {
            //console.log(error);
            logger.error(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
        } catch (error) {
            //console.log(error);
            logger.error(error);
        }
    }

    async updateById(uuid, object) {
        try {
            const data = await this.getAll();
            let updated = false;
            const newData = data.map((item) => {
                if (item.uuid === uuid) {
                    updated = true;
                    return { uuid, ...item, ...object };
                }
                return item;
            });
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2));
            return updated;
        } catch (error) {
            //console.log(error);
            logger.error(error);

        }
    }    

}

module.exports = ContenedorArchivo;

