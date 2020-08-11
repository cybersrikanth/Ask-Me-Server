const AnswerValidator = require("../validator/AnswerValidator");
const answerModel = require("../model/answerModel");
const { isValidObjectId } = require("mongoose");
const { ANSWER_ERROR, NOT_FOUND_ERROR } = require("../errors");
const httpResponse = require("../utils/httpResponse");
const { HTTP_SUCCESS_RESPONSE, HTTP_ERROR_RESPONSE } = require("../constants");
const questionModel = require("../model/questionModel");

class AnswerController {
    static async create(req, res) {
        try {
            let { answer } = req.body;
            if (!isValidObjectId(answer.questionId))
                throw ANSWER_ERROR.INVALID_QUESTION;
            answer = await AnswerValidator.create(answer);
            const newAnswer = new answerModel({
                ...answer,
                userId: req.user._id,
            });
            const question = await questionModel.findByIdAndUpdate(
                answer.questionId,
                {
                    $push: { answerId: newAnswer._id },
                }
            );
            if (!question) throw ANSWER_ERROR.INVALID_QUESTION;
            await newAnswer.save();
            return httpResponse(HTTP_SUCCESS_RESPONSE.CREATED, newAnswer, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async read(req, res) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) throw ANSWER_ERROR.INVALID_QUESTION;
            const answer = await answerModel
                .findById(id)
                .populate("questionId", ["title"]);
            if (!answer) throw NOT_FOUND_ERROR;
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, answer, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) throw NOT_FOUND_ERROR;
            let { answer } = req.body;
            answer = await AnswerValidator.update(answer);
            const newAnswer = await answerModel.findOneAndUpdate(
                {
                    _id: id,
                    userId: req.user._id,
                },
                {
                    ...answer,
                    edited: true,
                },
                { new: true }
            );
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, newAnswer, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id)) throw NOT_FOUND_ERROR;
            const deleted = await answerModel.deleteOne({
                _id: id,
                userId: req.user._id,
            });
            if (!deleted.deletedCount) throw NOT_FOUND_ERROR;
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, "deleted", res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }
}

module.exports = AnswerController;
