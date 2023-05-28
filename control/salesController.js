const Product = require('../model/Product')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')

module.exports.productSales = wrapAsync(async function (req, res) {
    const productSales = await Product.aggregate([
        {
            $group: {
                _id: { productName: "$productName" },
                totalAddedCost: {
                    $sum: "$price"
                }
            }
        }
    ]);
    return res.json({
        msg: productSales,
    })
        .status(200);;
});