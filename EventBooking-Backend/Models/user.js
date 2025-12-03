const mongoose = require("mongoose");


// Mongo db Schema
const User = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    ProfileImage: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


// creating model
const Users = mongoose.model("User",User);

module.exports = Users;