
var admin = require("firebase-admin");

const config = require('../config.js');

var serviceAccount = require("../" + config.FIREBASE_CONFIG_FILE);

const { v4: uuidv4 } = require('uuid');

class FirebaseFactory{
    static async conectar(){
        if(!FirebaseFactory.instanceFirebaseAdmin){
            try {
                if (!admin.apps.length) {
                    FirebaseFactory.instanceFirebaseAdmin = await admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        databaseURL: config.FIREBASE_DATABASE_URL
                    });
                    console.log('Base de datos Firebase conectada');

                }else{

                    FirebaseFactory.instanceFirebaseAdmin = admin.app();
                }


            } catch (error) {
                console.log(error);
            }
        }
        return FirebaseFactory.instanceFirebaseAdmin;
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
        let querySnap = await this.admin.firestore().collection(this.collectionName).get();
        let docs = querySnap.docs;

        let response = docs.map(doc => {
            return doc.data();
        });

        return response;
    }

    async getById(uuid){
        let doc = this.admin.firestore().collection(this.collectionName).doc(uuid);
        let item = await doc.get();

        return item.data();
    }

    async save(object) {
        let uuid = uuidv4();
        object.uuid = uuid;
        let datos = {... object};
        datos.uuid = uuid;
        const newObject = await this.admin.firestore().collection(this.collectionName).doc(uuid).create(datos);
        return uuid;
    }

    async updateById(uuid, object) {
        let datos = {... object};
        return await this.admin.firestore().collection(this.collectionName).doc(uuid).update(datos);
    }

    async deleteById(uuid) {
        return await this.admin.firestore().collection(this.collectionName).doc(uuid).delete();
    }

}

module.exports = ContenedorFirebase;