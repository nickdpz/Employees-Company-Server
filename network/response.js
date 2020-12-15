const withErrorStack = (error, message) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        console.error(error);
        return { error: message, errorComplete: error };
    }
    return { error: message };
};

const success = (req, res, result, status = 200) => {
    res.status(status || 200).send({
        'error': '',
        result
    });
};

const error = (req, res, message, error, status = 500) => {
    res.status(status).send(withErrorStack(error, message));
};

const original = (req, res, messages, status = 200) => { //eslint-disable-line
    res.status(status).send({
        'error': '',
        ...messages
    });
};

module.exports = { success, error, original };