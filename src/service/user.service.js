const UserNotFoundException = require('./exception/user-not-found.exception')
const { v4 } = require('uuid')
class UserService {
    users = []

    addUser(name, age, gender) {
        const newUser = {
            name,
            age,
            gender,
            id: v4()
        }
        this.users.push(newUser)
        return newUser
    }

    getAllUser() {
        return this.users
    }

    getUserById(id) {
        const user = this.users.find((u) => u.id === id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user

    }

    deleteUserById(id) {
        const user = this.getUserById(id)
        this.users = this.users.filter((u) => u.id !== id)

    }

    updateUser(id, name, age, gender) {
        const user = this.getUserById(id)
        user.name = name
        user.age = age
        user.gender = gender
        return user
    }
}

module.exports =  new UserService()