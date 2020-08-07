const httpResponse = require("../utils/httpResponse");
const { HTTP_SUCCESS_RESPONSE, HTTP_ERROR_RESPONSE } = require("../constants");
const UserValidator = require("../validator/UserValidator");
const userModel = require("../model/userModel");
const { USER_ERROR } = require("../errors");
const Hasher = require("../utils/Hasher");
const TokenProvider = require("../utils/TokenProvider");

class UserController {
    static async signup(req, res) {
        try {
            let { user } = req.body;
            user = await UserValidator.signup(user);
            const newUser = new userModel(user);
            await newUser.save();
            return httpResponse(HTTP_SUCCESS_RESPONSE.CREATED, newUser, res);
        } catch (error) {
            if (error.code == 11000) error = USER_ERROR.CONFLICT;
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }

    static async signin(req, res) {
        try {
            let { user } = req.body;
            user = await UserValidator.signin(user);
            const newUser = await userModel
                .findOne({ email: user.email })
                .select("+password");
            if (!newUser) throw USER_ERROR.INVALID;
            const valid = await Hasher.validatePassword(
                user.password,
                newUser.password
            );
            if (!valid) throw USER_ERROR.INVALID;
            const session = new Date().valueOf();
            const updatedUser = await userModel
                .findByIdAndUpdate(
                    newUser._id,
                    {
                        session: session,
                    },
                    { new: true }
                )
                .select("+password");
            const token = await TokenProvider.getToken(updatedUser);
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, token, res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.FORBIDDEN,
                error.message,
                res
            );
        }
    }

    static async signout(req, res) {
        try {
            const { user } = req;
            await userModel.updateOne({ _id: user._id }, { session: "" });
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, "signed out", res);
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.BAD_REQUEST,
                error.message,
                res
            );
        }
    }
}

module.exports = UserController;
