const mongoose = require("mongoose")
const Product = require("../model/Product")
const products = require('./products')

mongoose.set("strictQuery", true)

mongoose.connect('mongodb://127.0.0.1/salesDash', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database is Connected')
    })
    .catch(err => {
        console.log('this is error')
        console.log(err)
    })

const seedDb = async () => {
    await Product.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const rand20 = Math.floor(Math.random() * 20)
        const p = new Product({
            productType: products[rand20].productType,
            cost: products[rand20].cost,
            productName: products[rand20].productName,
            sold: products[rand20].sold,
            soldBy: products[rand20].soldBy,
            price: products[rand20].price,
            location: products[rand20].location,
            users: products[rand20].users
        })
        await p.save()
    }

}

seedDb().then(() => {
    mongoose.connection.close()
})