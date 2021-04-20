const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../config/auth')
const User = mongoose.model('User')
const Site = mongoose.model('Site')

router.get('/', auth.admin, function(req, res) {
  let filters = {}

  if (!req.user.roles.includes('super')) {
    filters = {
      site: req.user.site
    }
  }

  if (req.query.role && req.query.role !== 'user') {
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

router.get('/:id', auth.admin, function(req, res) {
  User.findById(req.params.id).then(function(user) {
    return res.send(user.data())
  })
})

router.post('/', auth.admin, async (req, res, next) => {
  const user = new User()

  user.email = req.body.email
  user.name = req.body.name
  user.picture = req.body.picture
  user.organization = req.body.organization
  user.address = req.body.address

  if (req.user.roles.includes('super')) {
    user.site = req.body.site
    user.roles = req.body.roles
  } else {
    user.site = req.user.site
    user.roles = req.body.roles.filter(r => r === 'super')
  }

  if (user.site) {
    const site = await Site.findById(user.site)
    user.site_slug = site.slug
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
//   user.site = req.body.site
//   user.address = req.body.address
//   user.roles = ['user']

//   if (user.site) {
//     const site = await Site.findById(user.site)
//     user.site_slug = site.slug
//   }

//   user.setPassword(req.body.password)

//   user.save().then(function() {
//     return res.send(user.data())
//   }).catch(next)
// })

router.put('/:id', auth.admin, function(req, res, next) {
  User.findById(req.params.id).then(async (user) => {
    user.email = req.body.email
    user.name = req.body.name
    user.picture = req.body.picture
    user.organization = req.body.organization
    user.address = req.body.address

    if (req.user.roles.includes('super')) {
      user.site = req.body.site
      if (req.body.roles && req.body.roles.length > 0) {
        user.roles = req.body.roles
      }
    } else {
      user.site = req.user.site
      user.roles = req.body.roles.filter(r => r !== 'super')
    }

    if (user.site) {
      const site = await Site.findById(user.site)
      user.site_slug = site.slug
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
    } else if (req.user.site !== user.site.toString()) {
      res.status(422).send('Você não tem permissão para excluír este usuário')
    } else {
      user.remove()
      res.send(user)
    }
  })
})

module.exports = router
