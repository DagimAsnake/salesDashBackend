const User = require('../model/User')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')


module.exports.viewProfile = wrapAsync(async (req, res) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return res.json({ msg: "User not found" }).status(403)
    }

    return res.json({ msg: user }).status(200)
})

module.exports.EditUserProfile = wrapAsync(async function (req, res) {
    const data = req.body
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);

    if (!(data.firstname && data.lastname && data.email && data.username)) {
        return res.json({
            msg: 'All inputs are required'
        })
    }

    const new_data = {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
    }

    const user_data = await User.findByIdAndUpdate(decodedToken.id, new_data, { runValidators: true, });
    if (!user_data) {
        return res.json({
            msg: "No such user"
        }).status(401)
    }

    return res.json({
        msg: "Data Updated Successfully"
    }).status(200)
})