const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Page = mongoose.model('Page')

router.get('/', (req, res) => {
  Page.find({}).populate(req.query.populate).exec((err, pages) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(pages)
    }
  })
})

router.get('/current_tags', (req, res) => {
  Page.find().select('tags').exec((err, pages) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      const tags = {}
      pages.forEach(page => {
        if (page.tags) {
          page.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => a.localeCompare(b)))
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
  if (!newPage.slug) {
    newPage.slug = slugify(newPage.title).toLowerCase()
  }
  newPage.save((err, page) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(page)
    }
  })
})

router.put('/:id', auth.admin, async (req, res) => {
  const params = req.body
  const page = await Page.findOne({ _id: req.params.id })
  Object.keys(params).forEach(key => {
    page[key] = params[key]
  })
  await page.save().then(page => {
    res.send(page)
  }).catch(err => {
    res.status(422).send(err.message)
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Page.findOne({
    slug: req.params.id
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
