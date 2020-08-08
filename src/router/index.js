const { Router } = require("express");
const authRoute = require("./authRoute");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const userRoute = require("./userRoute");
const questionRoute = require("./questionRoute");

const router = Router();

// public routes
router.get("/health-check", (req, res) => res.send("OK"));
router.use("/auth", authRoute);

// middleware
router.use(AuthMiddleware.validate);

// protected routes
router.use("/user", userRoute);
router.use("/question", questionRoute);

module.exports = router;
