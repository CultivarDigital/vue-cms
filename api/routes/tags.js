const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Tag = mongoose.model('Tag')

router.get('/', (req, res) => {
  Tag.find({}).populate(req.query.populate).sort('name').exec((err, tags) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(tags)
    }
  })
})

router.get('/:id', (req, res) => {
  Tag.findOne({
    _id: req.params.id
  }).exec((err, tag) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(tag)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newTag = new Tag(req.body)
  newTag.site = req.payload.site
  newTag.slug = slugify(newTag.name).toLowerCase()
  newTag.save((err, tag) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(tag)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Tag.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, tag) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(tag)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Tag.findOne({
    _id: req.params.id
  }).exec((err, tag) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      tag.remove()
      res.send(tag)
    }
  })
})

module.exports = router
