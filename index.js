const dotenv = require('dotenv')
dotenv.config()

const { express, app } = require('./server')
const mongoose = require('mongoose')
const cors = require('cors')
const createAdmin = require('./util/seedAdmin')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('./router/authRouter')
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const salesRouter = require("./router/salesRouter")
const analyticsRouter = require("./router/analyticRouter")

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

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sales Dashboard',
            version: '1.0.0',
            description: 'A simple sales dashboard',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/sales", salesRouter)
app.use("/analytics", analyticsRouter)