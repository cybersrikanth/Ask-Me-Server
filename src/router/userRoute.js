const { Router } = require("express");
const UserController = require("../controller/UserController");

const userRoute = Router();

userRoute.post("/signout", UserController.signout);

module.exports = userRoute;
