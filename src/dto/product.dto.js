const { object, string, number } = require('yup')

const productSchema = object({
    name: string().required().min(3),
    quantity: number().required().positive().integer(),
    price: number().required().positive().integer(),
    rating: number().required().positive().integer()
})

const productIDSchema = object({
    id: string().required().uuid(),
})

module.exports = { productSchema, productIDSchema }