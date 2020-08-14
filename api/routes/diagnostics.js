const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Diagnosis = mongoose.model('Diagnosis')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.learning_unit) {
    query.learning_unit = req.query.learning_unit
  }
  Diagnosis.find(query).sort('createdAt').exec((err, learningUnits) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(learningUnits)
    }
  })
})

router.get('/:id', (req, res) => {
  Diagnosis.findOne({
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
  const newDiagnosis = new Diagnosis(req.body)
  newDiagnosis.site = req.payload.site
  newDiagnosis.user = req.payload.id

  newDiagnosis.save((err, learningUnit) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(learningUnit)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  Diagnosis.findOneAndUpdate({
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
  Diagnosis.findOne({
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
