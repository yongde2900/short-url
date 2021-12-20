
const isUrl = require('is-url')
const https = require('https')
const http = require('http')


module.exports = {
    getRandomString: (length) => {
        let randoms = Math.random().toString(36).split('.')
        let random = randoms[0] + randoms[1]
        random = random.slice(-length)
        return random
    },
    urlExist: (url) => {
        return new Promise((resolve, reject) => {
            if (typeof url !== "string") {
                throw new TypeError(`Expected a string, got ${typeof url}`)
            }

            if (!isUrl(url)) {
                return resolve(false)
            }
            if (url.substring(0, 5) === 'https') {
                https.request(url, { method: 'HEAD' }, (res) => {
                    const statusCode = res.statusCode
                    return resolve(statusCode !== undefined && (statusCode < 400 || statusCode >= 500))
                }).on('error', (e) => {
                    return resolve(false)
                }).end()
            } else {
                http.request(url, { method: 'HEAD' }, (res) => {
                    const statusCode = res.statusCode
                    return resolve(statusCode !== undefined && (statusCode < 400 || statusCode >= 500))
                }).on('error', (e) => {
                    return resolve(false)
                }).end()
            }
            
        })
    }
}