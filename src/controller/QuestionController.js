const httpResponse = require("../utils/httpResponse");
const { HTTP_SUCCESS_RESPONSE, HTTP_ERROR_RESPONSE } = require("../constants");
const QuestionValidator = require("../validator/QuestionValidator");

class QuestionController {
    static async create(req, res) {
        try {
            let { question } = req.body;
            question = await QuestionValidator.create(question);
            return httpResponse(HTTP_SUCCESS_RESPONSE.CREATED, question, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }
}

module.exports = QuestionController;
