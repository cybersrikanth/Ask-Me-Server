require("./utils/environment");
const express = require("express");
const connect = require("./database/connect");
const router = require("./router");
const { PORT } = require("./utils/environment");

const app = express();
app.use(express.json());

const init = async () => {
    try {
        await connect();
        console.log("db connection success");
        app.use("/api", router);
    } catch (error) {
        console.log("db connection failed");
        process.exit(1);
    }
};

init();

app.listen(PORT, () => console.log("server running in port", PORT));
