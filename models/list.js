const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    urlId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('list',listSchema)