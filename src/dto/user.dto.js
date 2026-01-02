const { object, string, number } = require('yup')

const userSchema = object({
    name: string().required().min(3),
    age: number().required().positive().integer(),
    gender: string().required().oneOf(['female', 'male', 'others'])

})

const userIdSchema = object({
    id: string().uuid().required()

})

module.exports = { userSchema, userIdSchema }

