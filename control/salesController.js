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
        },
        {
            $project: {
                _id: 0,
                productName: "$_id.productName",
                totalAddedCost: 1
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


module.exports.searchPopular = wrapAsync(async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.productName = { $regex: search, $options: 'i' };
        }
        const result = await Product.find(query).sort({ sold: -1 }).limit(10);
        res.json({ msg: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
})


module.exports.searchSales = async (req, res, next) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.productName = { $regex: search, $options: 'i' };
        }
        const productSales = await Product.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { productName: "$productName" },
                    totalAddedCost: {
                        $sum: "$price"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    productName: "$_id.productName",
                    totalAddedCost: 1
                }
            }
        ]);
        res.json({ msg: productSales });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};