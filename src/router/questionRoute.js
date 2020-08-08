const { Router } = require("express");
const QuestionController = require("../controller/QuestionController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const questionRoute = Router();

questionRoute.get("/page/:page", QuestionController.readPage);
questionRoute.get("/:id", QuestionController.read);

// middleware
questionRoute.use(AuthMiddleware.validate);

questionRoute.post("/", QuestionController.create);
questionRoute.patch("/:id", QuestionController.update);
questionRoute.delete("/:id", QuestionController.delete);

module.exports = questionRoute;
