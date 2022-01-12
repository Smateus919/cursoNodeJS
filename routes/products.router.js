const express = require('express')
const ProductsService = require('../services/products.services')

const validatorHandler = require('../middleware/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const router = express.Router()

const sProducts = new ProductsService()

router.get('/', (req, res) => {
    const products = sProducts.getAllProducts()
    res.json(products)
})

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    (req, res, next) => {    
        try {
            const { id } = req.params
            const product = sProducts.getProduct(id)
            res.json(product)            
        } catch (error) {
            next(error)
    }
})

router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    (req, res) => {
    const body = req.body
    const newProduct = sProducts.create(body)
    res.status(201).json({
        message: 'create',
        data: newProduct
    })
})

router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    (req, res, next) => {    
    try {
        const { id } = req.params
        const body = req.body
        const newProduct = sProducts.updateProduct(id, body)
        res.json({
            message: 'update',
            data: newProduct
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        const { id } = req.params
        const rta = sProducts.deleteProduct(id)
        res.status(201).json(rta)
    } catch (error) {
        next(error)
    }
})
module.exports = router