const mongoose = require("mongoose");

const tagModel = "tag";

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        questionId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "question",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model(tagModel, tagSchema);
