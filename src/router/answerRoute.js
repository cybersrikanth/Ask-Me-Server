const { Router } = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const AnswerController = require("../controller/AnswerController");

const answerRoute = Router();

answerRoute.get("/:id", AnswerController.read);

// middleware
answerRoute.use(AuthMiddleware.validate);

answerRoute.post("/", AnswerController.create);
answerRoute.patch("/:id", AnswerController.update);
answerRoute.delete("/:id", AnswerController.delete);

module.exports = answerRoute;
