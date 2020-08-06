const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const LearningUnit = mongoose.model('LearningUnit')

router.get('/', (req, res) => {
  LearningUnit.find({}).populate(req.query.populate).sort('order').exec((err, learning_units) => {
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

router.post('/reorder', auth.admin, async (req, res) => {
  for (const item in req.body) {
    await LearningUnit.findOneAndUpdate({
      slug: req.body[item].slug
    }, {
      $set: { order: req.body[item].order }
    }, {
      upsert: true
    })
  }
  res.json('ok')
})

router.post('/', auth.admin, (req, res) => {
  const newLearningUnit = new LearningUnit(req.body)
  newLearningUnit.site = req.payload.site
  newLearningUnit.slug = slugify(newLearningUnit.name).toLowerCase()
  // newLearningUnit.order = 0
  newLearningUnit.save((err, learning_unit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learning_unit)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
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

router.delete('/:id', auth.admin, (req, res) => {
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
