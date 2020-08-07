const { Router } = require("express");
const UserController = require("../controller/UserController");

const authRoute = Router();

authRoute.post("/signup", UserController.signup);
authRoute.post("/signin", UserController.signin);

module.exports = authRoute;
