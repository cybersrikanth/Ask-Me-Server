const yup = require("yup");
const Hasher = require("../utils/Hasher");
const { STRIP_UNKNOWN } = require("../constants");

class UserValidator {
    static async signup(obj) {
        const schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(8).max(40).required(),
        });
        const user = await schema.validate(obj, STRIP_UNKNOWN);
        user.password = await Hasher.hashPassword(user.password);
        return user;
    }

    static async signin(obj) {
        const schema = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(8).max(40).required(),
        });
        return await schema.validate(obj, STRIP_UNKNOWN);
    }
}

module.exports = UserValidator;
