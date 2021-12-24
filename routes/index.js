const express = require('express')
const router =  express.Router()
const home = require('./modules/home')
const urls = require('./modules/url')
const users = require('./modules/user')

router.use('/users', users)
router.use('/urls', urls)
router.use('/', home)

module.exports = router