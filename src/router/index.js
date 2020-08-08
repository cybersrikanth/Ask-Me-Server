const { Router } = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const questionRoute = require("./questionRoute");
const answerRoute = require("./answerRoute");
const httpResponse = require("../utils/httpResponse");
const { HTTP_ERROR_RESPONSE } = require("../constants");

const router = Router();

router.get("/health-check", (req, res) => res.send("OK"));
router.use("/auth", authRoute);

router.use("/user", userRoute);
router.use("/question", questionRoute);
router.use("/answer", answerRoute);

router.use("*", (req, res) =>
    httpResponse(HTTP_ERROR_RESPONSE.NOT_FOUND, "Route Not Found", res)
);

module.exports = router;
