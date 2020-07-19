require('./models/Site')
require('./models/User')
require('./config/passport')

const express = require('express')
const app = express()
const router = require('express').Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const auth = require('./config/auth')

const isProduction = process.env.NODE_ENV === 'production'

app.use(session({ secret: 'terrakrya', cookie: { maxAge: null }, resave: false, saveUninitialized: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  mongoose.connect('mongodb://localhost/terrakrya', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('debug', true)
}

router.use('/auth', require('./routes/auth'))
router.use('/users', require('./routes/users'))
router.use('/sites', require('./routes/sites'))

router.get('/profile', auth.authenticated, function(req, res) {
  User.findById(req.payload.id).populate('site').exec(function(err, user) {
    if (!err && user) {
      res.send(user.data())
    } else {
      res.status(422).send('Usuário não encontrado')
    }
  })
})

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
