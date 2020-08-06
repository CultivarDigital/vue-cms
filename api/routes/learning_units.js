const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const LearningUnit = mongoose.model('LearningUnit')

router.get('/', (req, res) => {
  let query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  LearningUnit.find(query).populate(req.query.populate).sort('order').exec((err, learning_units) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learning_units)
    }
  })
})

router.get('/:id', (req, res) => {
  LearningUnit.findOne({
    slug: req.params.id
  }).exec((err, learning_unit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learning_unit)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newLearningUnit = new LearningUnit(req.body)
  newLearningUnit.site = req.payload.site
  newLearningUnit.slug = slugify(newLearningUnit.name).toLowerCase()

  if (req.payload.roles.includes('user')) {
    newLearningUnit.user = req.payload.id
    newLearningUnit.status = 'pending'
  } else {
    newLearningUnit.status = 'approved'
  }

  newLearningUnit.save((err, learning_unit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learning_unit)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  if (params.name) {
    params.slug = slugify(params.name).toLowerCase()    
  }
  LearningUnit.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, learning_unit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learning_unit)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  LearningUnit.findOne({
    slug: req.params.id
  }).exec((err, learning_unit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      learning_unit.remove()
      res.send(learning_unit)
    }
  })
})

module.exports = router
