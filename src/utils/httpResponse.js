const httpResponse = (code, data, res) => {
    const response = {
        status: code < 400,
        data: data,
    };
    res.status(code).json(response);
};

module.exports = httpResponse;
