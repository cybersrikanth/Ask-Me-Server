const yup = require("yup");
const { STRIP_UNKNOWN } = require("../constants");

const DEFAULT = {
    MIN: 5,
    MAX: 100000,
};
const TAG = /^[a-zA-Z0-9_]*$/;

class AnswerValidator {
    static async create(obj) {
        const schema = yup.object({
            answer: yup
                .string()
                .trim()
                .required()
                .min(DEFAULT.MIN)
                .max(DEFAULT.MAX),
            questionId: yup.string().max(50).required(),
        });

        return await schema.validate(obj, STRIP_UNKNOWN);
    }

    static async update(obj) {
        const schema = yup.object({
            answer: yup
                .string()
                .trim()
                .required()
                .min(DEFAULT.MIN)
                .max(DEFAULT.MAX),
        });

        return schema.validate(obj, STRIP_UNKNOWN);
    }
}

module.exports = AnswerValidator;
