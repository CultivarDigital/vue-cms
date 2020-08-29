const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Media = mongoose.model('Media')

router.get('/', (req, res) => {
  Media.find({}).populate(req.query.populate).sort({ createdAt: -1 }).exec((err, medias) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(medias)
    }
  })
})

router.get('/:id', (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(media)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newMedia = new Media(req.body)
  newMedia.site = req.payload.site
  if (!newMedia.publishing_date) {
    newMedia.publishing_date = new Date()
  }
  newMedia.save((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  Media.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      media.remove()
      res.send(media)
    }
  })
})

module.exports = router
