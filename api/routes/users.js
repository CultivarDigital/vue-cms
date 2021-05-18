const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../config/auth')
const User = mongoose.model('User')

router.get('/', auth.admin, function(req, res) {
  let filters = {}

  if (req.query.role && req.query.role !== 'user') {
    filters = {
      roles: req.query.role
    }
  }

  User.find(filters).exec(function(err, users) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(users.map(user => user.data()))
    }
  })
})

router.get('/:id', auth.admin, function(req, res) {
  User.findById(req.params.id).then(function(user) {
    return res.send(user.data())
  })
})

router.post('/', auth.admin, (req, res, next) => {
  const user = new User()

  user.email = req.body.email
  user.name = req.body.name
  user.picture = req.body.picture
  user.organization = req.body.organization
  user.address = req.body.address

  if (req.user.roles.includes('super')) {
    user.roles = req.body.roles
  } else {
    user.roles = req.body.roles.filter(r => r === 'super')
  }

  user.setPassword(req.body.password)

  user.save().then(function() {
    return res.send(user.data())
  }).catch(next)
})

// router.post('/register', async (req, res, next) => {
//   const user = new User()

//   user.email = req.body.email
//   user.name = req.body.name
//   user.picture = req.body.picture
//   user.organization = req.body.organization
//   user.address = req.body.address
//   user.roles = ['user']

//   user.setPassword(req.body.password)

//   user.save().then(function() {
//     return res.send(user.data())
//   }).catch(next)
// })

router.put('/:id', auth.admin, function(req, res, next) {
  User.findById(req.params.id).then((user) => {
    user.email = req.body.email
    user.name = req.body.name
    user.picture = req.body.picture
    user.organization = req.body.organization
    user.address = req.body.address

    if (req.user.roles.includes('super')) {
      if (req.body.roles && req.body.roles.length > 0) {
        user.roles = req.body.roles
      }
    } else {
      user.roles = req.body.roles.filter(r => r !== 'super')
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
  User.findById(req.user.id).then(function(user) {
    user.email = req.body.email
    user.name = req.body.name
    user.picture = req.body.picture
    user.organization = req.body.organization
    user.address = req.body.address
    if (req.body.password) {
      user.setPassword(req.body.password)
    }
    user.save().then(function() {
      return res.send(user.data())
    }).catch(next)
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  User.findOne({
    _id: req.params.id
  }).exec((err, user) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (req.user.roles.includes('super')) {
      res.status(422).send('Super usuários não podem ser excluídos')
    } else if (req.params.id === req.user.id) {
      res.status(422).send('Você não pode excuír você mesmo')
    } else {
      user.remove()
      res.send(user)
    }
  })
})

module.exports = router
