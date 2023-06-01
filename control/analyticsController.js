const Product = require('../model/Product')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')

module.exports.getAnalytics = wrapAsync(async function (req, res) {
    const productAnalytics = await Product.aggregate([
        {
            $group: {
                _id: { productName: "$productName" },
                totalUsers: { $sum: "$users" },
                totalAddedCost: { $sum: "$price" },
                productType: { $first: "$productType" }
            }
        },
        {
            $project: {
                _id: 0,
                productName: "$_id.productName",
                totalUsers: 1,
                totalAddedCost: 1,
                productType: 1
            }
        }
    ]);
    return res.status(200).json({
        msg: productAnalytics,
    });
});

module.exports.getRecentProduct = async function (req, res) {
    const Recents = await Product.find({ sold: true }).sort({ createdAt: -1 }).limit(8);
    let data = [];
    Recents.forEach((product) => {
        let datas = {
            _id: product.id,
            productType: product.productType,
            cost: product.cost,
            productName: product.productName,
            sold: product.sold,
            soldBy: product.soldBy,
            price: product.price,
            location: product.location,
            users: product.users,
            soldDate: product.createdAt
        }
        data.push(datas);
    });
    return res.json({
        msg: Recents
    }).status(200)
}

module.exports.getLocation = wrapAsync(async function (req, res) {
    const productLocation = await Product.aggregate([
        {
            $group: {
                _id: "$location",
                count: { $sum: 1 },
            },
        }
    ]);
    return res.json({
        msg: productLocation,
    })
        .status(200);
});