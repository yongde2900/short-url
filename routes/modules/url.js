const express = require('express')
const router = express.Router()
const { urlExist, getRandomString } = require('../../utilities/method')
const Url = require('../../models/url')

router.post('/', async (req, res) => {
    try {
        const originalUrl = req.body.path
        const isUrlExist = await urlExist(originalUrl)

        //判斷網址是否有效
        if (!isUrlExist)
            return res.render('index', { message: '無效的網址', originalUrl })

        //判斷短網址是否已存在
        let url = await Url.findOne({ origin: originalUrl }).exec()
        if (url)
            return res.render('index', { shortUrl: url.short, originalUrl })

        let newUrl = {}
        let isDuplicated = true
        newUrl.origin = originalUrl
        //判斷短網址是否重複
        while (isDuplicated) {
            let short = `http://localhost:3000/urls/${getRandomString(8)}`
            let url = await Url.findOne({ short: short })
            if (!url) {
                newUrl.short = short
                isDuplicated = false
            }

        }
        await Url.create(newUrl)
        return res.render('index', { shortUrl: newUrl.short, originalUrl: newUrl.origin })
    } catch (e) {
        console.warn(e)
    }
})


module.exports = router