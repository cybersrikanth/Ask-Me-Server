const mongoose = require("mongoose");

const answerModel = "answer";

const answerSchema = new mongoose.Schema(
    {
        answer: {
            type: String,
            required: true,
        },
        edited: {
            type: Boolean,
            default: false,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(answerModel, answerSchema);
