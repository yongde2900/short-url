const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes/index')
const passport = require('./config/passport')

const app = express()
const PORT = process.env.PORT || 3000

//mongodb
require('./config/mongoose')

//handlebars
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
}))

usePassport(app)
//route
app.use(routes)

app.listen(PORT, () => {
    console.log('server is listening')
})