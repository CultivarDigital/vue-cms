const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Village = mongoose.model('Village')

router.get('/', (req, res) => {
  Village.find({}).populate(req.query.populate).sort('name').exec((err, villages) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(villages)
    }
  })
})

router.get('/:id', (req, res) => {
  Village.findOne({
    slug: req.params.id
  }).exec((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(village)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newVillage = new Village(req.body)
  newVillage.site = req.payload.site
  newVillage.slug = slugify(newVillage.name).toLowerCase()
  newVillage.save((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(village)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Village.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(village)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Village.findOne({
    slug: req.params.id
  }).exec((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      village.remove()
      res.send(village)
    }
  })
})

module.exports = router
