

const supertest = require('supertest')
const chai = require('chai')
const expect = chai.expect


let uuid_created_product = null;

let product = {
    name:'Producto de prueba',
    description: 'Descripción de prueba', 
    code: '123456', 
    price: 100, 
    stock: 10, 
    photo_url: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const request = supertest('http://localhost:8080')

describe('test API', () => {

 
        it('Debe poder guardar un producto', async () => {
         
            let res = await request.post('/api/productos').send(product);
            expect(res.status).to.equal(200);
            const resBody = res.body;
            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url');
            uuid_created_product = resBody.uuid;
        })


        it('Debo poder consultar un producto guardado', async () => {
            let res = await request.get('/api/productos/' + uuid_created_product);
            expect(res.status).to.equal(200)
            const resBody = res.body;
            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url');
            expect(resBody.name).to.equal(product.name);
            expect(resBody.description).to.equal(product.description);
            expect(resBody.code).to.equal(product.code);
            expect(resBody.price).to.equal(product.price);
            expect(resBody.stock).to.equal(product.stock);
            expect(resBody.photo_url).to.equal(product.photo_url);
        })

        it('Debe poder actualizar un producto', async () => {
            let product_updated = {...product, name: 'Producto de prueba actualizado'}
            let res = await request.put('/api/productos/' + uuid_created_product).send(product_updated);
            expect(res.status).to.equal(200)
            const resBody = res.body;
            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url');
            expect(resBody.name).to.equal(product_updated.name);
            expect(resBody.description).to.equal(product_updated.description);
            expect(resBody.code).to.equal(product_updated.code);
            expect(resBody.price).to.equal(product_updated.price);
            expect(resBody.stock).to.equal(product_updated.stock);
            expect(resBody.photo_url).to.equal(product_updated.photo_url);
        })

        it('Debe poder borrar un producto', async () => {
            let res = await request.delete('/api/productos/' + uuid_created_product);
            expect(res.status).to.equal(200)
            const resBody = res.body;
            expect(resBody.description).to.equal('producto eliminado');
        })


    
})