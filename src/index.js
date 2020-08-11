require("./utils/environment");
const express = require("express");
const cors = require("cors");
const connect = require("./database/connect");
const router = require("./router");
const { PORT } = require("./utils/environment");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await connect();
        console.log("db connection success");
        app.use("/api", router);
    } catch (error) {
        console.log("db connection failed");
        process.exit(1);
    }
})();
app.disable("x-powered-by");

app.listen(PORT, () => console.log("server running in port", PORT));

module.exports = app;
