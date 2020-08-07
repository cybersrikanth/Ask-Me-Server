const { Router } = require("express");
const authRoute = require("./authRoute");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const userRoute = require("./userRoute");

const router = Router();

router.get("/health-check", (req, res) => res.send("OK"));

router.use("/auth", authRoute);

router.use("/user", AuthMiddleware.validate, userRoute);

module.exports = router;
