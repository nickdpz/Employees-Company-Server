const joi = require('joi');

function validate(data, schema) {
    const objectJoi = joi.object(schema);
    const { error } = objectJoi.validate(data);
    return error;
}

function validationHandler(schema, check = 'body') { //get body of request and validate
    return (req, res, next) => {
        let error = validate(req[check], schema);
        if (error) {
            const errors = error.details.map(e => ({ message: e.message, ok: false }));
            const message = `Error ${error.details[0].message}`;
            next({ message, errors, status: 400 });
        } else {
            next();
        }
    };
}

module.exports = validationHandler;