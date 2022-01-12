const express = require('express')
const CategoriesService = require('../services/categories.services')


const router = express.Router()
const sCategories = new CategoriesService()

router.get('/', (req, res) => {
    const categories = sCategories.getAllCategories()
    res.json(categories)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const category = sCategories.getCategory(id)
    res.json(category)    
})

router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params
    res.json(
        {
            categoryId,
            productId
        }  
    )
})

module.exports = router