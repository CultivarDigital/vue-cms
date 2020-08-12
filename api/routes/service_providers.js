const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const ServiceProvider = mongoose.model('ServiceProvider')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  ServiceProvider.find(query).populate(req.query.populate).sort('order').exec((err, serviceProviders) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(serviceProviders)
    }
  })
})

router.get('/:id', (req, res) => {
  ServiceProvider.findOne({
    slug: req.params.id
  }).exec((err, serviceProvider) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(serviceProvider)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newServiceProvider = new ServiceProvider(req.body)
  newServiceProvider.site = req.payload.site
  newServiceProvider.slug = slugify(newServiceProvider.name).toLowerCase()
  newServiceProvider.user = req.payload.id

  if (req.payload.roles.includes('user')) {
    newServiceProvider.status = 'pending'
  } else {
    newServiceProvider.status = 'approved'
  }

  newServiceProvider.save((err, serviceProvider) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(serviceProvider)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  if (params.name) {
    params.slug = slugify(params.name).toLowerCase()
  }
  ServiceProvider.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, serviceProvider) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(serviceProvider)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  ServiceProvider.findOne({
    slug: req.params.id
  }).exec((err, serviceProvider) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      serviceProvider.remove()
      res.send(serviceProvider)
    }
  })
})

module.exports = router
