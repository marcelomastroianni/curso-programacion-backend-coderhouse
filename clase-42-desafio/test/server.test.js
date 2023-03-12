//import supertest from "supertest"
//import chai, { expect } from 'chai'

const supertest = require('supertest')
const chai = require('chai')
const expect = chai.expect



const request = supertest('http://localhost:8080')

describe('test API', () => {
    describe('GET', () => {
        it('La petición debería retornar status 200', async () => {
            let res = await request.get('/api/productos')
            expect(res.status).to.equal(200)
        })
    })

    
    describe('POST', () => {
        it('Debe poder guardar un producto', async () => {
            let product = {
                name:'Producto de prueba',
                description: 'Descripción de prueba', 
                code: '123456', 
                price: 100, 
                stock: 10, 
                photo_url: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
            }
            let res = await request.post('/api/productos').send(product)
            expect(res.status).to.equal(200)
            const resBody = res.body
            expect(resBody).to.include.keys('name', 'description', 'code', 'price', 'stock', 'photo_url')
        })
    })
    
})