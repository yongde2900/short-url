const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const User = require('../../models/user')
const List = require('../../models/list')
const { findUrl } = require('../../utilities/method')
const url = require('../../models/url')

router.post('/', async (req, res) => {
    try {
        const user = await req.user
        const userId = user._id
        const urlId = req.body.urlId
        let list = await List.findOne({ userId, urlId }).exec()
        //判斷是否存在
        if (list) {
            req.flash('warning_msg', 'already saved')
            return res.redirect('/')
        }

        //新增資料
        const newList = { userId, urlId }
        List.create(newList)
        req.flash('success_msg', 'successful save')
        res.redirect('/')
    } catch (e) {
        console.warn(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await req.user
        const userId = user._id
        const lists = await List.find({ userId })
        let urlList = await findUrl(lists)
        res.render('list', { urlList })
    } catch (e) {
        console.warn(e)
    }
})

module.exports = router