const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes/index')
const flash = require('connect-flash')

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

app.use(flash())
app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

//route
app.use(routes)

app.listen(PORT, () => {
    console.log('server is listening')
})