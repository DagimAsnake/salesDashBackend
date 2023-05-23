const mongoose = require('mongoose')
const { model, Schema } = mongoose

const TokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

TokenSchema.methods.deleteToken = async function () {
    try {
        await this.remove();
    } catch (err) {
        console.error(err);
    }
};

const Token = model("Token", TokenSchema)

module.exports = Token