const User = require('../model/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "thisissecret"
const wrapAsync = require('../util/wrapAsync')
const SALT = 12

module.exports.Login = wrapAsync(async (req, res) => {
    const data = req.body
    if (!data.email && data.password) {
        return res.json({
            msg: 'Please enter your email or password'
        })
    }

    const user = await User.findOne({ email: data.email })
    if (!user) {
        return res.json({
            msg: "Incorrect email or password"
        })
    }

    const correctPassword = await bcrypt.compare(data.password, user.password)
    if (!correctPassword) {
        return res.json({
            msg: "Incorrect email or password"
        }).status(401)
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" })
    return res.json({
        msg: 'Logged in successfully',
        token: token
    })

})