const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const SeedsNetwork = mongoose.model('SeedsNetwork')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  SeedsNetwork.find(query).populate(req.query.populate).sort('name').exec((err, seedsNetworks) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(seedsNetworks)
    }
  })
})

router.get('/:id', (req, res) => {
  SeedsNetwork.findOne({
    slug: req.params.id
  }).exec((err, seedsNetwork) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(seedsNetwork)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newSeedsNetwork = new SeedsNetwork(req.body)
  newSeedsNetwork.site = req.payload.site
  newSeedsNetwork.slug = slugify(newSeedsNetwork.name).toLowerCase()
  newSeedsNetwork.user = req.payload.id

  if (req.payload.roles.includes('user')) {
    newSeedsNetwork.status = 'pending'
  } else {
    newSeedsNetwork.status = 'approved'
  }

  newSeedsNetwork.save((err, seedsNetwork) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(seedsNetwork)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  if (params.name) {
    params.slug = slugify(params.name).toLowerCase()
  }
  SeedsNetwork.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, seedsNetwork) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(seedsNetwork)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  SeedsNetwork.findOne({
    slug: req.params.id
  }).exec((err, seedsNetwork) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      seedsNetwork.remove()
      res.send(seedsNetwork)
    }
  })
})

module.exports = router
