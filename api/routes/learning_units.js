const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const LearningUnit = mongoose.model('LearningUnit')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  if (req.query.status) {
    query.status = req.query.status
  }
  LearningUnit.find(query).populate(req.query.populate).sort('name').exec((err, learningUnits) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learningUnits)
    }
  })
})

router.get('/:id', (req, res) => {
  LearningUnit.findOne({
    slug: req.params.id
  }).exec((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learningUnit)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newLearningUnit = new LearningUnit(req.body)
  newLearningUnit.site = req.payload.site
  newLearningUnit.slug = slugify(newLearningUnit.name).toLowerCase()
  newLearningUnit.user = req.payload.id

  if (req.payload.roles.includes('user')) {
    newLearningUnit.status = 'pending'
  } else {
    newLearningUnit.status = 'approved'
  }

  newLearningUnit.save((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learningUnit)
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
  }, (err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learningUnit)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  LearningUnit.findOne({
    slug: req.params.id
  }).exec((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      learningUnit.remove()
      res.send(learningUnit)
    }
  })
})

module.exports = router
