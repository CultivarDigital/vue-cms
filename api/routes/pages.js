const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Page = mongoose.model('Page')

router.get('/', (req, res) => {
  Page.find({}).populate(req.params.populate).exec((err, pages) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(pages)
    }
  })
})

router.get('/:id', (req, res) => {
  Page.findOne({
    slug: req.params.id
  }).exec((err, page) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(page)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newPage = new Page(req.body)
  newPage.site = req.payload.site
  newPage.slug = slugify(newPage.name).toLowerCase()
  newPage.save((err, page) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(page)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Page.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, page) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(page)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Page.findOne({
    _id: req.params.id
  }).exec((err, page) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      page.remove()
      res.send(page)
    }
  })
})

module.exports = router
