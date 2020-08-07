const TokenProvider = require("../utils/TokenProvider");
const userModel = require("../model/userModel");
const { ACCESS_ERROR } = require("../errors");
const httpResponse = require("../utils/httpResponse");
const { HTTP_ERROR_RESPONSE } = require("../constants");

class AuthMiddleware {
    static async validate(req, res, next) {
        try {
            const token = String(req.headers.authorization).split(" ")[1];
            if (!token) throw ACCESS_ERROR.NO_TOKEN;
            const decoded = await TokenProvider.decodeToken(token);
            const user = await userModel
                .findById(decoded.id)
                .select("+password");
            if (!user) throw ACCESS_ERROR.UN_AUTHORIZED;
            const verified = await TokenProvider.verifyToken(token, user);
            if (verified.session !== user.session)
                throw ACCESS_ERROR.UN_AUTHORIZED;
            req.user = user;
            next();
        } catch (error) {
            return httpResponse(
                error.HTTP_CODE || HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
                error.message,
                res
            );
        }
    }
}

module.exports = AuthMiddleware;
