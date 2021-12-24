const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login' }))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    let { name, email, password, confirmPassword } = req.body
    let errors = []
    if (!name || !email || !password || !confirmPassword)
        errors.push('All fields are required')
    if (password !== confirmPassword)
        errors.push("Password dosn't match confirm password")
    if (errors.length) {
        console.log(errors)
        return res.render('register', { errors, name, email })
    }
    let user = await User.findOne({ email }).exec()
    if (user) {
        console.log(user)
        errors.push('email is exist')
        console.log(errors)
        return res.render('register', { errors, name, email })
    }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    User.create({ name, email, password: hash })
    res.redirect('/')
})

module.exports = router