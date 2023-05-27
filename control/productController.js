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