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

module.exports.popularProducts = wrapAsync(async function (req, res) {
    const popular = await Product.find({ sold: true }).sort({ users: -1 }).limit(7);
    let data = [];
    popular.forEach((popular) => {
        let datas = {
            _id: popular.id,
            productType: popular.productType,
            cost: popular.cost,
            productName: popular.productName,
            sold: popular.sold,
            soldBy: popular.soldBy,
            price: popular.price,
            location: popular.location,
            users: popular.users,
            soldDate: popular.createdAt
        }
        data.push(datas);
    });
    return res.json({
        msg: popular
    }).status(200)
})