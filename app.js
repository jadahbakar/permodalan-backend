var createError = require('http-errors')
var express = require('express')
var compression = require('compression')
require('dotenv').config()
const helmet = require('helmet') // for security

var path = require('path')
var cookieParser = require('cookie-parser')

// var logger = require("morgan");
var morgan = require('morgan')
var winston = require('./config/winston')

var cors = require('cors')
const fileUpload = require('express-fileupload')

var app = express()
app.use(compression())
app.use(cors())
app.use(fileUpload())
app.options('*', cors())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(morgan('combined', { stream: winston.stream }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.disable('etag')
app.disable('Last-Modified')

app.use(
  express.static(path.join(__dirname, 'public'), {
    etag: false
  })
)

// for Security Reason we use
app.use(helmet())
app.use(helmet.expectCt())
app.use(helmet.noCache())
app.use(helmet.referrerPolicy())

app.use((req, res, next) => {
  res.removeHeader('X-XSS-Protection')
  res.removeHeader('Access-Control-Allow-Origin')
  res.removeHeader('Cache-Control')
  res.removeHeader('Connection')
  res.removeHeader('Expect-CT')
  res.removeHeader('Expires')
  res.removeHeader('Pragma')
  res.removeHeader('Referrer-Policy')
  res.removeHeader('Strict-Transport-Security')
  res.removeHeader('Surrogate-Control')
  res.removeHeader('X-DNS-Prefetch-Control')
  res.removeHeader('X-Download-Options')
  res.removeHeader('X-Frame-Options')
  res.removeHeader('X-RateLimit-Limit')
  res.removeHeader('X-RateLimit-Remaining')
  res.removeHeader('X-RateLimit-Reset')
  next()
})

// Router
var masterRouter = require('./routes/masterRoutes')

app.use('/api/master', masterRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  // res.render('error')
  res.status(500).send({ error: 'Internal server error happened' })
})

module.exports = app
