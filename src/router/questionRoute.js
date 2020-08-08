const { Router } = require("express");
const QuestionController = require("../controller/QuestionController");

const questionRoute = Router();

questionRoute.post("/", QuestionController.create);
// questionRoute.post("/signin", UserController.signin);

module.exports = questionRoute;
