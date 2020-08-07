// HTTP status codes
const HTTP_SUCCESS_RESPONSE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
};
const HTTP_ERROR_RESPONSE = {
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
};

// yup validator

const STRIP_UNKNOWN = { stripUnknown: true };

module.exports = {
    HTTP_SUCCESS_RESPONSE,
    HTTP_ERROR_RESPONSE,
    STRIP_UNKNOWN,
};
