const { HTTP_ERROR_RESPONSE } = require("./constants");

const USER_ERROR = {
    CONFLICT: {
        message: "User already exists",
        HTTP_CODE: HTTP_ERROR_RESPONSE.CONFLICT,
    },
    INVALID: {
        message: "Invalid username or password",
        HTTP_CODE: HTTP_ERROR_RESPONSE.FORBIDDEN,
    },
};

const ACCESS_ERROR = {
    UN_AUTHORIZED: {
        message: "Please login again to continue",
        HTTP_CODE: HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
    },
    NO_TOKEN: {
        message: "No token provided",
        HTTP_CODE: HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
    },
};

module.exports = { USER_ERROR, ACCESS_ERROR };
