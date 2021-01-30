require('./database')

const express = require('express')
const app = express()
const router = require('express').Router()
const bodyParser = require('body-parser')
const session = require('express-session')

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Site = mongoose.model('Site')
const auth = require('./config/auth')

const secret = process.env.SECRET || 'cms'

app.use(session({ secret, cookie: { maxAge: null }, resave: false, saveUninitialized: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// eslint-disable-next-line
app.use('/uploads', express.static(__dirname + '/uploads'))

router.use('/auth', require('./routes/auth'))
router.use('/uploads', require('./routes/uploads'))
router.use('/users', require('./routes/users'))
router.use('/sites', require('./routes/sites'))
router.use('/categories', require('./routes/categories'))
router.use('/tags', require('./routes/tags'))
router.use('/projects', require('./routes/projects'))
router.use('/posts', require('./routes/posts'))
router.use('/events', require('./routes/events'))
router.use('/pages', require('./routes/pages'))
router.use('/contacts', require('./routes/contacts'))
router.use('/medias', require('./routes/medias'))
router.use('/menus', require('./routes/menus'))

router.get('/profile', auth.authenticated, function(req, res) {
  User.findById(req.payload.id).populate('site').exec(function(err, user) {
    if (!err && user) {
      res.send(user.data())
    } else {
      res.status(422).send('Usuário não encontrado')
    }
  })
})

router.get('/site', function(req, res) {
  Site.findOne({ domain_name: req.headers.host.replace('www.', '') })
    .populate('pages')
    .populate({
      path: 'posts',
      model: 'Post',
      options: { sort: { createdAt: -1 } }
    })
    .populate({
      path: 'events',
      model: 'Event',
      options: { sort: { start_at: -1 } }
    })
    .populate({
      path: 'medias',
      model: 'Media',
      options: { sort: { createdAt: -1 } }
    })
    .populate({
      path: 'users',
      model: 'User',
      select: 'name organization address',
      options: { sort: 'name' }
    })
    .exec(function(err, site) {
      if (!err && site) {
        res.send(site)
      } else {
        res.status(422).send('Site não encontrado')
      }
    })
})

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
