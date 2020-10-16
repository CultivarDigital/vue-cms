const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const WomenGroup = mongoose.model('WomenGroup')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  WomenGroup.find(query).populate(req.query.populate).sort('name').exec((err, womenGroups) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(womenGroups)
    }
  })
})

router.get('/:id', (req, res) => {
  WomenGroup.findOne({
    slug: req.params.id
  }).exec((err, womenGroup) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(womenGroup)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newWomenGroup = new WomenGroup(req.body)
  newWomenGroup.site = req.payload.site
  newWomenGroup.slug = slugify(newWomenGroup.name).toLowerCase()
  newWomenGroup.user = req.payload.id

  if (req.payload.roles.includes('user')) {
    newWomenGroup.status = 'pending'
  } else {
    newWomenGroup.status = 'approved'
  }

  newWomenGroup.save((err, womenGroup) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(womenGroup)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  if (params.name) {
    params.slug = slugify(params.name).toLowerCase()
  }
  WomenGroup.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, womenGroup) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(womenGroup)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  WomenGroup.findOne({
    slug: req.params.id
  }).exec((err, womenGroup) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      womenGroup.remove()
      res.send(womenGroup)
    }
  })
})

module.exports = router
