const User = require('../model/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "thisissecret"
const wrapAsync = require('../util/wrapAsync')
const Token = require('../model/Token')
const sendEmail = require("../util/sendEmail")
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
    if (!user.isactive) {
        return res.json({
            msg: "You are not allowed to log in"
        }).status(401)
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "24h" })
    return res.json({
        msg: 'Logged in successfully',
        token: token
    })

})

module.exports.VerifyUserToken = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const validToken = jwt.verify(token, SECRET_KEY);
    if (validToken) {
        return res
            .json({
                msg: true,
                payload: {
                    user: validToken.id,
                    role: validToken.role,
                },
            })
            .status(401);
    }
    return res
        .json({
            msg: false,
        })
        .status(200);
});


module.exports.resetPassword = async function (req, res) {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.json({ msg: "User with the given email dont exist" }).status(200)
    }
    let token = await Token.findOne({ userId: user._id })
    if (!token) {
        let data = {
            userId: user._id,
            token: jwt.sign({ id: user._id }, SECRET_KEY)
        }
        token = new Token(data)
        await token.save()
    }
    const link = `http://localhost:3000/auth/passwordreset/${user._id}/${token.token}`
    await sendEmail(
        user.email,
        "Sales Dashboard Reset",
        `Your password reset link is here:  ${link}`
    )
    return res.json({
        msg: "Reset password link is sent via Email Successfully"
    }).status(200)
}

module.exports.changeForgetPassword = async function (req, res) {
    const { token, userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
        return res.json({
            msg: "Invalid or Expired Token"
        }).status(200)
    }
    const check_token = await Token.findOne({ token: token })
    if (!check_token) {
        return res.json({
            msg: "Invalid or Expired Token"
        }).status(401)
    }

    const password = req.body.password
    const confirm_password = req.body.confirm_Password

    if (password != confirm_password) {
        return res
            .json({
                msg: "Passwords Must Match",
            })
            .status(401);
    }

    const hashedPassword = await bcrypt.hash(password, SALT)
    user.password = hashedPassword
    await user.save()
    await check_token.deleteToken();
    return res.json({
        msg: "Password Changed Successfully"
    })
}

module.exports.ChangePassword = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const validToken = jwt.verify(token, SECRET_KEY);
    const { oldpassword, confirm_password, new_password } = req.body;

    if (!(oldpassword && confirm_password && new_password)) {
        return res.json({
            msg: "All input is required",
        });
    }

    if (new_password != confirm_password) {
        return res.json({
            msg: "Password Must Match"
        }).status(200)
    }
    const user = await User.findById(validToken.id);
    if (!user) {
        return res.json({
            msg: "No such user "
        }).status(401)
    }
    const correctold = await bcrypt.compare(oldpassword, user.password)
    if (!correctold) {
        return res.json({
            msg: "Incorrect old password"
        }).status(200)
    }
    const new_pass = await bcrypt.hash(new_password, SALT);
    await User.findByIdAndUpdate(validToken.id, { password: new_pass });
    return res.json({
        msg: "Password Changed Successfully"
    }).status(200)
})