var mongoose = require('mongoose'),
  router = require('express').Router(),
  passport = require('passport'),
  auth = require('../config/auth')
  User = mongoose.model('User')

router.get('/', auth.super, function(req, res) {
  var filters = {}
  if (req.query.role && req.query.role != 'user') {
    filters = {
      roles: req.query.role
    }
  }

  User.find(filters).populate('site').exec(function(err, users) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(users.map(user => user.data()))
    }
  })
})

router.post('/', auth.admin, function(req, res, next) {
  var user = new User()

  user.email = req.body.email
  user.name = req.body.name
  user.site = req.body.site

  if (req.payload.roles.includes('super')) {
    user.roles = req.body.roles
  } else {
    user.roles = req.body.roles.filter(value => {
      value == 'super'
    })
  }

  user.setPassword(req.body.password)

  user.save().then(function() {
    return res.send(user.data())
  }).catch(next)
})

router.put('/:id', auth.admin, function(req, res, next) {
  User.findById(req.params.id).then(function(user) {

    user.email = req.body.email
    user.name = req.body.name

    if (req.payload.roles.includes('super')) {
      user.roles = req.body.roles
    }

    if (req.body.password) {
      user.setPassword(req.body.password)
    }

    user.save().then(function() {
      return res.send(user.data())
    }).catch(next)
  })
})

router.put('/', auth.authenticated, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    console.log('user')
    console.log(user)
    console.log(req.body)

    user.email = req.body.email
    user.name = req.body.name

    if (req.payload.roles.includes('super')) {
      user.roles = req.body.roles
    }

    if (req.body.password) {
      user.setPassword(req.body.password)
    }

    user.save().then(function() {
      return res.send(user.data())
    }).catch(next)
  })
})


module.exports = router
