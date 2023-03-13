
const chai = require('chai')
const expect = chai.expect
const axios = require('axios')


let uuid_created_product = null;

let product = {
    name:'Producto de prueba',
    description: 'Descripción de prueba', 
    code: '123456', 
    price: 100, 
    stock: 10, 
    photo_url: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}


describe('test API with axios', () => {
   


   
        it('Debe poder guardar un producto', async () => {
     


            let res = await axios.post('http://localhost:8080/api/productos', product);
     
            expect(res.status).to.equal(200)
            const resBody = res.data;
            //console.log(resBody);
            uuid_created_product = resBody.uuid;

            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url')

        })

        it('Debo poder consultar un producto guardado', async () => {
            let res = await axios.get('http://localhost:8080/api/productos/' + uuid_created_product);
            
            expect(res.status).to.equal(200);

            const resBody = res.data;
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
            let res = await axios.put('http://localhost:8080/api/productos/' + uuid_created_product, product_updated);
            expect(res.status).to.equal(200)
            const resBody = res.data;
            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url')
            expect(resBody.name).to.equal(product_updated.name)
        });

        it('Debe poder borrar un producto', async () => {
            let res = await axios.delete('http://localhost:8080/api/productos/' + uuid_created_product);
            expect(res.status).to.equal(200)
            const resBody = res.data;
            expect(resBody.description).to.equal('producto eliminado');

        });


    
    
})