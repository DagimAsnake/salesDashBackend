const User = require('../model/User')
const bcrypt = require('bcrypt')
const SALT = 12

const createAdmin = async function () {
    const adminExists = await User.find({})
    if (!adminExists.length) {
        const password = await bcrypt.hash("1234", SALT)
        const newData = {
            username: 'Admin',
            firstname: 'Admin',
            lastname: 'Admin',
            email: "workdagimasnake@gmail.com",
            password: password,
            role: 'Admin',
            isactive: true
        }
        const admin = new User(newData)
        await admin.save()
    }
}

module.exports = createAdmin