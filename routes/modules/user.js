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
        errors.push({ message: 'All fields are required' })
    if (password !== confirmPassword)
        errors.push({ message: "Password dosn't match confirm password" })
    if (errors.length) {
        return res.render('register', { errors, name, email })
    }
    let user = await User.findOne({ email }).exec()
    if (user) {
        errors.push({ message: 'email is exist' })
        return res.render('register', { errors, name, email })
    }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    User.create({ name, email, password: hash })
    req.flash('success_msg', 'Registered successfully')
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '成功登出')
    res.redirect('/users/login')
})

module.exports = router