const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('url',urlSchema)