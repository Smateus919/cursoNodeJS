const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
    constructor(){
        this.products = []
        this.generateProducts()
    }
    generateProducts(){
        const limit = 20
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.number().toString(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl()
            })
        } 
    }
    create(data){
        const newProduct = {
            id: faker.datatype.number().toString(),
            ...data
        }
        this.products.push(newProduct)
        return newProduct
    }
    getAllProducts(){
        return this.products
    }
    getProduct(id){
        const product = this.products.find(item => item.id === id)
        if (!product) {
            throw boom.notFound('Product not found')
        }
        return product
    }
    updateProduct(id, changes){
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index]
        
    }
    deleteProduct(id){
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        this.products.splice(index, 1)
        return { Message: 'producto eliminado'}
    }
}

module.exports = ProductsService