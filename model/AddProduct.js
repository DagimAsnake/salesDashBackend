const { Schema, model } = require('mongoose')

const addProductSchema = new Schema({
    productName: {
        type: String
    },
    productSpecification: {
        type: String
    },
    productQuantity: {
        type: String
    },
    shelfNumber: {
        type: String
    },
    warehouseNumber: {
        type: String
    },
    productType: {
        type: String
    },
    safetyType: {
        type: String
    },
    measuringInput: {
        type: String
    },
    expireDate: {
        type: String
    },
    productUsability: {
        type: String
    }
})

const AddProduct = model("AddProduct", addProductSchema)

module.exports = AddProduct