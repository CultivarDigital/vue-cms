require('./models/Site')
require('./models/User')
require('./config/passport')

const express = require('express'),
  app = express(),
  router = require('express').Router(),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('./config/auth')


var isProduction = process.env.NODE_ENV === 'production'

app.use(session({ secret: 'terrakrya', cookie: { maxAge: null }, resave: false, saveUninitialized: false  }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if(isProduction){
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

router.get('/profile', auth.authenticated, function(req, res) {
  User.findById(req.payload.id).populate('site').exec(function(err, user) {
    if (!err) {
      res.send(user.data())
    }
  })
})

app.use(router)

module.exports = {
   path: '/api',
   handler: app
}
