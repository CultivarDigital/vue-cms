require('./models/Site')
require('./models/User')
require('./models/Category')
require('./models/Project')
require('./models/Post')
require('./models/Tag')
require('./models/Village')
require('./models/Page')
require('./config/passport')

const express = require('express')
const app = express()
const router = require('express').Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Site = mongoose.model('Site')
const auth = require('./config/auth')

const isProduction = process.env.NODE_ENV === 'production'

app.use(session({ secret: 'terrakrya-cms', cookie: { maxAge: null }, resave: false, saveUninitialized: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static(__dirname + '/uploads'));

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
  mongoose.connect('mongodb://localhost/terrakrya-cms', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('debug', true)
}

router.use('/auth', require('./routes/auth'))
router.use('/uploads', require('./routes/uploads'))
router.use('/users', require('./routes/users'))
router.use('/sites', require('./routes/sites'))
router.use('/categories', require('./routes/categories'))
router.use('/projects', require('./routes/projects'))
router.use('/posts', require('./routes/posts'))
router.use('/tags', require('./routes/tags'))
router.use('/villages', require('./routes/villages'))
router.use('/pages', require('./routes/pages'))

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
  console.log('sitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesitesite')
  console.log(req.headers.host);
  Site.findOne({ domain_name: req.headers.host })
    .populate('pages')
    .populate('categories')
    .populate('tags')
    .populate({
      path: 'projects',
      model: 'Project',
      options: { sort: 'order' },
      populate: [{
          path: 'tags',
          model: 'Tag'
        }
      ]
    })
    .populate({
      path: 'posts',
      model: 'Post',
      options: { sort: { createdAt: -1 } },
      populate: [{
          path: 'tags',
          model: 'Tag'
        }
      ]
    })
    .populate({
      path: 'villages',
      model: 'Village',
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
