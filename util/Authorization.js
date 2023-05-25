const User = require("../model/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "thisissecret"

module.exports.isAdmin = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET_KEY);
        if (decodedToken.role != "Admin") {
            return res
                .json({
                    msg: "You are Unauthorized to view this content",
                })
                .status(403);
        }
    } catch (err) {
        console.log(err);
    }
    next();
};

module.exports.isEmployee = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET_KEY);
        if (decodedToken.role != "Employee") {
            return res
                .json({
                    msg: "You are Unauthorized to view this content",
                })
                .status(403);
        }
    } catch (err) {
        console.log(err);
    }
    next();
};