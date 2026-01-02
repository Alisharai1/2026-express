const ProductNotFoundException = require('../service/exception/product-not-found.exception')
const { v4 } = require('uuid')
class ProductService {
    products = []

    addProduct(name, quantity, price, rating) {
        const product = {
            name,
            quantity,
            price,
            rating,
            id: v4()
        }
        this.products.push(product)
        return product
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id)
        if (!product) {
            throw new ProductNotFoundException("product not found")
        }
        return product
    }

    updateProductById(id, name, quantity, price, rating) {
        const product = this.getProductById(id)
        product.name = name
        product.quantity = quantity
        product.price = price
        product.rating = rating
        return product

    }

    deleteProduct(id) {
        this.getProductById(id)
        this.products = this.products.filter((p) => p.id !== id)
    }
}

module.exports = new ProductService()