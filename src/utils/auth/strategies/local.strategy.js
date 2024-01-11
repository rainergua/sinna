const { Strategy } = require('passport-local');
const { buscarEmail } = require('./../../../app/controllers/auth.controller'); 
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy({
        usernameField: 'ci_usuario',
        passwordField: 'password'
    },
    async (ci_usuario, password, done) => {
    try {
        const user = await buscarEmail({ body: { ci_usuario } });
        if (user === null) {
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false);
        }
        delete user.password;
        done(null, user);
    } catch (error) {
        return done(error, false);
    }
});
module.exports = LocalStrategy;