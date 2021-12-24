const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {

    //initialize
    app.use(passport.initialize())
    app.use(passport.session())

    //stratrgy
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            let user = await User.findOne({ email }).exec()
            if (!user)
                return done(null, false, { message: 'Incorrect email' })
            if (user.password !== password)
                return done(null, false, { message: 'Incorrect password' })
            return done(null, user)
        }
        catch (e) {
            console.warn(e)
        }

    }))

    //serialize and deserialize
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            let user = User.findById(id).exec()
            return done(null, user)
        }
        catch (e) {
            console.warn(e)
        }
    })
}