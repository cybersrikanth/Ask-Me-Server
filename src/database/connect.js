const mongoose = require("mongoose");
const { DB_URI } = require("../utils/environment");

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
