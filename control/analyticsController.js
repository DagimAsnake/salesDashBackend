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

module.exports.searchAnalytics = async (req, res, next) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.productName = { $regex: search, $options: 'i' };
        }
        const filteredData = await Product.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: { productName: "$productName" },
                    totalAddedCost: {
                        $sum: "$price"
                    },
                    totalUsers: {
                        $sum: "$users"
                    },
                    productType: {
                        $first: "$productType"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    productName: "$_id.productName",
                    totalAddedCost: 1,
                    totalUsers: 1,
                    productType: 1
                }
            }
        ]);
        
        res.status(200).json({ msg: filteredData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};
module.exports.searchRecent = async (req, res) => {
    try {
      const { search, startDate, endDate } = req.query;
      let query = {};
  
      if (search) {
        query.productName = { $regex: search, $options: 'i' };
      }
  
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
  
      const recentProducts = await Product.aggregate([
        {
          $match: query,
        },
        {
          $project: {
            productName: 1,
            price: 1,
            createdAt: 1,
          },
        },
        {
          $group: {
            _id: { productName: '$productName', createdAt: '$createdAt' },
            totalAddedCost: {
              $sum: '$price',
            },
          },
        },
        {
          $project: {
            _id: 0,
            productName: '$_id.productName',
            createdAt: '$_id.createdAt',
            totalAddedCost: 1,
          },
        },
      ])
        .sort({ createdAt: -1 })
        .exec();
  
      res.json({ success: true, recentProducts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };