const User = require('../model/User')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')
const bcrypt = require("bcrypt")
const SALT = 12


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

module.exports.CreateUser = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const data = req.body;
    if (
        !(
            data.firstname &&
            data.lastname &&
            data.password &&
            data.role &&
            data.email &&
            data.username
        )
    ) {
        return res.json({
            msg: "All inputs are required",
        });
    }

    const hashedpassword = await bcrypt.hash(data.password, SALT);
    let datas = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: hashedpassword,
        role: data.role,
    };

    const new_user = new User(datas);

    await new_user.save();
    return res
        .json({
            msg: "User created successfully",
        })
        .status(200);
});

module.exports.getAllUsers = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const users = await User.find({});

    let data = [];
    users.forEach((user) => {
        let datas = {
            _id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            email: user.email,
        };
        data.push(datas);
    });
    return res
        .json({
            msg: data,
        })
        .status(200);
});
