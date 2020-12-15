const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const storeUser = require('../../components/users/store');

passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async(req, email, password, cb) => {
        try {
            const user = await storeUser.getUserAuth({ email, active: true });
            if (!user) {
                return cb({ message: 'unauthorized', status: 401 }, false);
            }
            const pass = await user.equalPassword(password);
            if (!pass) {
                return cb({ message: 'unauthorized', status: 401 }, false);
            }
            delete user.password;
            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);