const httpResponse = require("../utils/httpResponse");
const {
    HTTP_SUCCESS_RESPONSE,
    HTTP_ERROR_RESPONSE,
    PAGE_LIMIT,
} = require("../constants");
const QuestionValidator = require("../validator/QuestionValidator");
const questionModel = require("../model/questionModel");
const tagModel = require("../model/tagModel");
const { ACCESS_ERROR, NOT_FOUND_ERROR, REQUEST_ERROR } = require("../errors");
const { isValidObjectId } = require("mongoose");

class QuestionController {
    static async create(req, res) {
        try {
            let { question } = req.body;
            let tagsToAdd = [];
            question = await QuestionValidator.create(question);
            if (question.tagId && question.tagId.length) {
                const tags = question.tagId.map((item) => ({ name: item }));
                try {
                    await tagModel.insertMany(tags, { ordered: false });
                } catch (error) {}
                const tagObjects = await tagModel.find({
                    name: question.tagId,
                });
                tagsToAdd = tagObjects.map((item) => item._id);
            }
            const newQuestion = new questionModel({
                ...question,
                userId: req.user._id,
                tagId: tagsToAdd,
            });
            await tagModel.updateMany(
                { _id: { $in: tagsToAdd } },
                { $push: { questionId: newQuestion.id } }
            );
            await newQuestion.save();
            return httpResponse(
                HTTP_SUCCESS_RESPONSE.CREATED,
                newQuestion,
                res
            );
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
            if (!isValidObjectId(id)) throw NOT_FOUND_ERROR;
            const question = await questionModel
                .findById(id)
                .populate([
                    { path: "tagId", select: "name" },
                    { path: "userId", select: "email" },
                    {
                        path: "answerId",
                        options: { sort: { createdAt: -1 } },
                        populate: {
                            path: "userId",
                            select: "email",
                        },
                    },
                ])
                .select(["-createdAt", "-updatedAt", "-__v"]);
            if (!question) throw NOT_FOUND_ERROR;
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, question, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async readPage(req, res) {
        try {
            const { page } = req.params;
            const limit = PAGE_LIMIT;
            if (isNaN(page) || page < 1) throw REQUEST_ERROR.INVALID;
            const skip = (page - 1) * limit;
            const questions = await questionModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("userId", ["email"])
                .populate("tagId", ["name"]);
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, questions, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async search(req, res) {
        try {
            let { keyword } = req.query;
            keyword = await QuestionValidator.search(keyword);
            let result;
            if (keyword.slice(0, 1) === "#") {
                result = await tagModel
                    .find({
                        name: { $regex: keyword.slice(1), $options: "i" },
                    })
                    .populate({
                        path: "questionId",
                        populate: { path: "tagId userId" },
                    })
                    .sort({ createdAt: -1 })
                    .limit(25)
                    .select(["-updatedAt", "-__v"]);
                let questions = [];
                const temp = {};
                result.forEach((tag) => {
                    tag.questionId.forEach((question) => {
                        if (!temp[question._id]) {
                            temp[question._id] = true;
                            questions.push(question);
                        }
                    });
                });
                result = questions;
            } else {
                result = await questionModel
                    .find({
                        title: { $regex: keyword, $options: "i" },
                    })
                    // .select("title");
                    .populate("userId", ["email"])
                    .populate("tagId", ["name"]);
            }
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, result, res);
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
            let { question } = req.body;
            question = await QuestionValidator.update(question);
            const newQuestion = await questionModel.findOneAndUpdate(
                { _id: id, userId: req.user._id },
                {
                    ...question,
                    edited: true,
                },
                { new: true }
            );
            if (!newQuestion) throw ACCESS_ERROR.EDIT;
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, newQuestion, res);
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
            const deleted = await questionModel.deleteOne({
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

module.exports = QuestionController;
