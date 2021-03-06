const yup = require("yup");
const { STRIP_UNKNOWN } = require("../constants");

const DEFAULT = {
    TITLE_MIN: 5,
    TITLE_MAX: 255,
    DESC_MIN: 5,
    DESC_MAX: 10000,
};
const TAG = /^[a-zA-Z0-9_]*$/;

class QuestionValidator {
    static async create(obj) {
        const schema = yup.object({
            title: yup
                .string()
                .required()
                .min(DEFAULT.TITLE_MIN)
                .max(DEFAULT.TITLE_MAX),
            description: yup
                .string()
                .required()
                .min(DEFAULT.DESC_MIN)
                .max(DEFAULT.DESC_MAX),
            tagId: yup
                .array()
                .of(yup.string().max(20).matches(TAG, "invalid tag"))
                .max(5),
        });

        return await schema.validate(obj, STRIP_UNKNOWN);
    }

    static async update(obj) {
        const schema = yup.object({
            title: yup
                .string()
                .required()
                .min(DEFAULT.TITLE_MIN)
                .max(DEFAULT.TITLE_MAX),
            description: yup
                .string()
                .required()
                .min(DEFAULT.DESC_MIN)
                .max(DEFAULT.DESC_MAX),
        });

        return schema.validate(obj, STRIP_UNKNOWN);
    }

    static async search(obj) {
        const schema = yup
            .string()
            .max(40)
            .required("keyword is required field");
        return schema.validate(obj, STRIP_UNKNOWN);
    }
}

module.exports = QuestionValidator;
