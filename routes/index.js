const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const urls = require('./modules/url')
const users = require('./modules/user')
const lists = require('./modules/list')

router.use('/users', users)
router.use('/urls', urls)
router.use('/list', lists)
router.use('/', home)

module.exports = router