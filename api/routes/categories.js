const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Category = mongoose.model('Category')

router.get('/', (req, res) => {
  Category.find({}).populate(req.query.populate).sort('name').exec((err, categories) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(categories)
    }
  })
})

router.get('/:id', (req, res) => {
  Category.findOne({
    slug: req.params.id
  }).exec((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(category)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newCategory = new Category(req.body)
  newCategory.site = req.payload.site
  newCategory.slug = slugify(newCategory.name).toLowerCase()
  newCategory.save((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(category)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Category.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(category)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Category.findOne({
    slug: req.params.id
  }).populate('projects').exec((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (category.projects && category.projects.length) {
      res.status(422).send('Não é possível excluír! Existem projetos cadastrados nesta linha de ação')
    } else {
      category.remove()
      res.send(category)
    }
  })
})

module.exports = router
