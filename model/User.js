const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Sales", "Marketing"],
    },
    isactive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

const User = model("User", userSchema)

module.exports = User