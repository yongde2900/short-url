const express = require('express')
const router =  express.Router()
const home = require('./modules/home')
const urls = require('./modules/url')

router.use('/urls', urls)
router.use('/', home)

module.exports = router