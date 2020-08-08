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
    EDIT: {
        message: "Requested resource cannot be edited",
        HTTP_CODE: HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
    },
    DELETE: {
        message: "Requested resource cannot be deleted",
        HTTP_CODE: HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
    },
};

const NOT_FOUND_ERROR = {
    message: "Resource not found",
    HTTP_CODE: HTTP_ERROR_RESPONSE.NOT_FOUND,
};

const ANSWER_ERROR = {
    INVALID_QUESTION: {
        message: "Question not found",
        HTTP_CODE: HTTP_ERROR_RESPONSE.NOT_FOUND,
    },
};

const REQUEST_ERROR = {
    INVALID: {
        message: "Invalid request",
        HTTP_CODE: HTTP_ERROR_RESPONSE.BAD_REQUEST,
    },
};
module.exports = {
    USER_ERROR,
    ACCESS_ERROR,
    NOT_FOUND_ERROR,
    REQUEST_ERROR,
    ANSWER_ERROR,
};
