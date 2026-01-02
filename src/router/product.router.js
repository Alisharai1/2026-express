const productService = require('../service/product.service')
const { productIDSchema, productSchema } = require('../dto/product.dto')
const ProductNotFoundException = require('../service/exception/product-not-found.exception')

const express = require('express')
const { ValidationError } = require('yup')
const router = express.Router()


router.get('/', (req, res) => {
    const products = productService.getProducts()
    res.status(200).json(products)

})

router.get('/:id', (req, res) => {
    try {
        productIDSchema.validateSync(req.params, { abortEarly: false, strict: true })
        const product = productService.getProductById(req.params.id)
        res.status(200).json(product)

    } catch (error) {
        if (error instanceof ProductNotFoundException) {
            res.status(404).json({ message: "product not found" })
        }
        else if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        }
    }

})

router.post('/', (req, res) => {
    try {
        productSchema.validateSync(req.body, { abortEarly: false, strict: true })
        const product = productService.addProduct(req.body.name, req.body.quantity, req.body.price, req.body.rating)
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        }
    }
})

router.put('/:id', (req, res) => {
    try {
        productIDSchema.validateSync(req.params, { abortEarly: false, strict: true })
        productSchema.validateSync(req.body, { abortEarly: false, strict: true })
        const product = productService.updateProductById(req.params.id, req.body.name, req.body.quantity, req.body.price, req.body.rating)
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })

        } else if (error instanceof ProductNotFoundException) {
            res.status(404).json({ message: "product not found" })
        }
    }

})

router.delete('/:id', (req, res) => {
    try {
        productIDSchema.validateSync(req.params, { abortEarly: false, strict: true })
        productService.deleteProduct(req.params.id)
        res.status(200).json({ message: "product deleted succesfully" })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        } else if (error instanceof ProductNotFoundException) {
            res.status(404).json({ message: "product not found" })
        }
    }
})

module.exports = router
