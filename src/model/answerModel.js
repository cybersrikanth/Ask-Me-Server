const mongoose = require("mongoose");

const answerModel = "answer";

const answerSchema = new mongoose.Schema(
    {
        answer: {
            type: String,
            required: true,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(answerModel, answerSchema);
