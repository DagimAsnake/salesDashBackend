const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productType: {
        type: String
    },
    cost: {
        type: Number
    },
    productName: {
        type: String
    },
    sold: {
        type: Boolean,
        default: false,
    },
    soldBy: {
        type: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    }
}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = Product