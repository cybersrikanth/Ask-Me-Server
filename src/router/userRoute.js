const { Router } = require("express");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const userRoute = Router();

// middleware
userRoute.use(AuthMiddleware.validate);

userRoute.post("/signout", UserController.signout);

module.exports = userRoute;
