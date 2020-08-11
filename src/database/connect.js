const mongoose = require("mongoose");
const { DB_URI, TEST } = require("../utils/environment");
const { Mockgoose } = require("mockgoose");

const DB_OPTIONS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

const connect = async () => {
    return await mongoose.connect(DB_URI, DB_OPTIONS);
};

module.exports = connect;
