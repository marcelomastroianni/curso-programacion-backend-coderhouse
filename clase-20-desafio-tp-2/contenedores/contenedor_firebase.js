
var admin = require("firebase-admin");

//var serviceAccount = require("path/to/serviceAccountKey.json");
var serviceAccount = require("../coderhouse-clase20-desafio-firebase-adminsdk-nshyk-a86f38e25b.json");


let instanceFirebaseAdmin = null;


class FirebaseFactory{
    static async conectar(){
        if(!instanceFirebaseAdmin){
            try {
                if (!admin.apps.length) {
                    instanceFirebaseAdmin = await admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        databaseURL: "https://coderhouse-clase20-desafio.firebaseio.com"
                    });
                    console.log('Base de datos Firebase conectada');
                }
            } catch (error) {
                console.log(error);
            }
        }
        return instanceFirebaseAdmin;
    }
}



class ContenedorFirebase {

    constructor(collectionName) {
        this.conectar();
        this.collectionName = collectionName;
    }

    async conectar() {
        this.admin = await FirebaseFactory.conectar();
    }


    async getAll() {
        return await this.admin.firestore().collection(this.collectionName).get();
    }

    async getById(id) {
        return await this.admin.firestore().collection(this.collectionName).doc(id).get();
    }

    async save(object) {
        const newObject = new this.admin.firestore().collection(this.collectionName)(object);
        return await newObject.save();
    }


    async updateById(id, object) {
        return await this.admin.firestore().collection(this.collectionName).doc(id).update(object);
    }

    async deleteById(id) {
        return await this.admin.firestore().collection(this.collectionName).doc(id).delete();
    }

}

module.exports = ContenedorFirebase;