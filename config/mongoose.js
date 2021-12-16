const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () =>{
    console.log(`mongodb error: ${err}`)
})
db.once('open', () => {
    console.log('mongodb connected')
})

module.exports = db