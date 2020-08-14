const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Monitoring = mongoose.model('Monitoring')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.learning_unit) {
    query.learning_unit = req.query.learning_unit
  }
  Monitoring.find(query).sort('createdAt').exec((err, learningUnits) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learningUnits)
    }
  })
})

router.get('/:id', (req, res) => {
  Monitoring.findOne({
    _id: req.params.id
  }).exec((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learningUnit)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const Mewmonitoring = new Monitoring(req.body)
  Mewmonitoring.site = req.payload.site
  Mewmonitoring.user = req.payload.id

  Mewmonitoring.save((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learningUnit)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  Monitoring.findOneAndUpdate({
    _id: req.params.id
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
  Monitoring.findOne({
    _id: req.params.id
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
