const Product = require('../model/Product')
const SECRET_KEY = "thisissecret"
const jwt = require("jsonwebtoken")
const wrapAsync = require('../util/wrapAsync')

module.exports.getAllProducts = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const products = await Product.find({});

    let data = [];
    products.forEach((product) => {
        let datas = {
            _id: product.id,
            productType: product.productType,
            cost: product.cost,
            productName: product.productName,
            sold: product.sold,
            soldBy: product.soldBy,
            price: product.price,
            location: product.location,
            users: product.users
        };
        data.push(datas);
    });
    return res
        .json({
            msg: data,
        })
        .status(200);
});

module.exports.getOneProduct = wrapAsync(async function (req, res) {
    const { proid } = req.params;
    const productDetail = await Product.findById(proid);
    if (!productDetail) {
        return res
            .json({
                msg: "No such user",
            })
            .status(401);
    }
    let data = {
        productType: productDetail.productType,
        cost: productDetail.cost,
        productName: productDetail.productName,
        sold: productDetail.sold,
        soldBy: productDetail.soldBy,
        price: productDetail.price,
        location: productDetail.location,
    };
    return res
        .json({
            msg: data,
        })
        .status(200);
});

module.exports.getDashboardData = wrapAsync(async function (req, res) {
    const products = await Product.find({});
    const customers = await Product.find({ sold: true });
    const numOfCustomers = customers.length;
    const totalPrice = customers.reduce((acc, customer) => acc + customer.price, 0);
    const totalCost = products.reduce((acc, product) => acc + product.cost, 0);
    let data = {
        customers: numOfCustomers,
        totalSum: totalPrice,
        totalCost: totalCost,
        totalOrders: 156
    };
    return res
        .json({
            msg: data,
        })
        .status(200);
})

module.exports.getPieChart = wrapAsync(async function (req, res) {
    const products = (await Product.find({})).length;
    const sold = (await Product.find({ sold: true })).length;
    const unsold = (await Product.find({ sold: false })).length;
    let data = {
        products: products,
        sold: sold,
        unsold: unsold
    };
    return res
        .json({
            msg: data,
        })
        .status(200);
})