const response = require('../../network/response');

const errorHandler = (error, req, res, next) => { //eslint-disable-line
    return response.error(req, res, error.message, error.errors, error.status || 401);
};
const notFound = (req, res) => {
    return response.error(req, res, 'not found', 'not found', 404);
};
module.exports = {
    errorHandler,
    notFound
};