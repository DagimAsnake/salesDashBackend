const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`App is listenning on port ${PORT}`)
})

module.exports = {
    app,
    express
}