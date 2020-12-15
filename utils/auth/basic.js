const passport = require('passport');
const { BasicStrategy } = require('passport-http');

const storeUser = require('../../components/users/store');

passport.use(
    new BasicStrategy(async function(email, password, cb) {
        try {
            const user = await storeUser.getUserAuth({ email, active: true });
            if (!user) {
                return cb({ message: 'unauthorized' }, false);
            }
            const pass = await user.equalPassword(password);
            if (!pass) {
                return cb({ message: 'unauthorized' }, false);
            }

            delete user.password;

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);