const mongoose = require("mongoose");

const userModel = "user";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    session: {
        type: String,
    },
});

module.exports = mongoose.model(userModel, userSchema);
