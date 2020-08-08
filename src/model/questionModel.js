const mongoose = require("mongoose");

const questionModel = "question";

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        answerId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "answer",
            },
        ],
        tagId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "tag",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model(questionModel, questionSchema);
