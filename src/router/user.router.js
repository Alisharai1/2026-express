const { ValidationError } = require('yup')
const { userSchema, userIdSchema } = require('../dto/user.dto')
const UserNotFoundException = require('../service/exception/user-not-found.exception')

const userService = require('../service/user.service')
const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.status(200).json(userService.getAllUser())
})

router.post('/', (req, res) => {
    try {
        userSchema.validateSync(req.body, { abortEarly: false, strict: true })
        const newUser = userService.addUser(req.body.name, req.body.age, req.body.gender)
        res.status(200).json(newUser)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        }
    }

})

router.get('/:id', (req, res) => {
    try {
        userIdSchema.validateSync(req.params, { abortEarly: false, strict: true })
        const user = userService.getUserById(req.params.id)
        res.status(200).json(user)

    } catch (error) {
        if (error instanceof UserNotFoundException) {
            res.status(404).json({ message: "user not found" })
        }
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        }
    }
})

router.put('/:id', (req, res) => {
    try {
        userIdSchema.validateSync(req.params, { abortEarly: false, strict: true })
        userSchema.validateSync(req.body, { abortEarly: false, strict: true })
        const user = userService.updateUser(req.params.id, req.body.name, req.body.age, req.body.gender)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        } else if (error instanceof UserNotFoundException) {
            res.status(404).json({ message: "user not found" })
        }
    }
})

router.delete('/:id', (req, res) => {
    try {
        userIdSchema.validateSync(req.params, { abortEarly: false, strict: true })
        userService.deleteUserById(req.params.id)
        res.status(200).json({ message: "user deleted" })

    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ errors: error.errors })
        } else if (error instanceof UserNotFoundException) {
            res.status(404).json({ message: "user not found" })
        }
    }
})

module.exports = router