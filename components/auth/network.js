const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const response = require('../../network/response');
const validationUsers = require('../../fields/permissions.json');
// Basic strategy - API
require('../../utils/auth/basic');
// Local strategy - Web
require('../../utils/auth/local');


router.post('/api/sign-in', async (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
        try {
            if (error || !user) {
                next(error);
                return false;
            } else {
                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error);
                        return false;
                    } else {
                        const { _id: id, name, email, phone, role, companyId } = user;

                        const payload = {
                            sub: id,
                            name,
                            email
                        };
                        const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET, {
                            expiresIn: '15m'
                        });
                        return response.original(req, res, { token, user: { id, name, email, phone, role, companyId }, permissions: validationUsers[role] });
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

router.post('/sign-in', async (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        try {
            if (error || !user) {
                next(error);
                return false;
            } else {
                req.login(user, { session: true }, async function (error) {
                    if (error) {
                        next(error);
                        return false;
                    } else {
                        return response.success(req, res, 'Validate');
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = router;