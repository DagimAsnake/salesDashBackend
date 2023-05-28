const Product = require('../model/Product')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')
module.exports.getAnalytics = wrapAsync(async function (req, res) {
    const productAnalytics = await Product.aggregate([
        {
            $group: {
                _id: { productName: "$productName", productType: "$productType" },
                totalUsers: { $sum: "$users" },
                totalAddedCost: { $sum: "$price" },
            }
        }
    ]);
    return res.json({
        msg: productAnalytics,
    })
        .status(200);
});