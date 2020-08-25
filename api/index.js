require('./models/Site')
require('./models/User')
require('./models/Category')
require('./models/Project')
require('./models/Post')
require('./models/Tag')
require('./models/Village')
require('./models/Page')
require('./models/LearningUnit')
require('./models/Diagnosis')
require('./models/Preparation')
require('./models/Planting')
require('./models/Monitoring')
require('./models/Maintenance')
require('./models/Harvest')
require('./models/ServiceProvider')
require('./models/SeedsNetwork')
require('./models/Newsletter')
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

app.use(session({ secret: 'caminhos-da-semente', cookie: { maxAge: null }, resave: false, saveUninitialized: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// eslint-disable-next-line
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.set('useFindAndModify', false)
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
  // mongoose.set('debug', true)
  mongoose.connect('mongodb://localhost/caminhos-da-semente', { useNewUrlParser: true, useUnifiedTopology: true })
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
router.use('/learning_units', require('./routes/learning_units'))
router.use('/diagnostics', require('./routes/diagnostics'))
router.use('/preparations', require('./routes/preparations'))
router.use('/plantings', require('./routes/plantings'))
router.use('/monitorings', require('./routes/monitorings'))
router.use('/maintenances', require('./routes/maintenances'))
router.use('/harvests', require('./routes/harvests'))
router.use('/service_providers', require('./routes/service_providers'))
router.use('/seeds_networks', require('./routes/seeds_networks'))
router.use('/newsletters', require('./routes/newsletters'))

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
  Site.findOne({ domain_name: req.headers.host })
    .populate('pages')
    .populate({
      path: 'learning_units',
      model: 'LearningUnit',
      options: { sort: 'name' },
      populate: [
        {
          path: 'diagnostics',
          model: 'Diagnosis'
        },
        {
          path: 'preparations',
          model: 'Preparation'
        },
        {
          path: 'plantings',
          model: 'Planting'
        },
        {
          path: 'monitorings',
          model: 'Monitoring'
        },
        {
          path: 'maintenances',
          model: 'Maintenance'
        },
        {
          path: 'harvests',
          model: 'Harvest'
        }
      ]
    })
    .populate({
      path: 'service_providers',
      model: 'ServiceProvider',
      options: { sort: 'name' }
    })
    .populate({
      path: 'seeds_networks',
      model: 'SeedsNetwork',
      options: { sort: 'name' }
    })
    .populate({
      path: 'tags',
      model: 'Tag',
      options: { sort: 'name' }
    })
    .populate({
      path: 'posts',
      model: 'Post',
      options: { sort: { createdAt: -1 } },
      populate: [{
        path: 'tags',
        model: 'Tag',
        select: 'slug name'
      }]
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
