const validationUsers = require('../../fields/permissions.json');

function usersValidationHandler(allowedScope) {
    return function(req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            next();
        } else {
            if (!req.user || (req.user && !req.user.role)) {
                next({ message: 'unauthorized', status: 401 });
            }
            const hasAccess = validationUsers[req.user.role].includes(allowedScope);
            if (hasAccess) {
                next();
            } else {
                next({ message: 'unauthorized', status: 401 });
            }
        }
    };
}

module.exports = usersValidationHandler;