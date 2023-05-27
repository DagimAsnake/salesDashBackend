const dotenv = require('dotenv')
dotenv.config()

const { express, app } = require('./server')
const mongoose = require('mongoose')
const cors = require('cors')
const createAdmin = require('./util/seedAdmin')

const authRouter = require('./router/authRouter')
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")

mongoose.set("strictQuery", true)

const MONGO_URL = process.env.MONGO_URL
mongoose.connect('mongodb://127.0.0.1/salesDash', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected successfully")
    })
    .catch((err) => {
        console.log("Error while connecting", err)
    })

createAdmin()
    .then(() => {
        console.log("Admin Exists")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter)