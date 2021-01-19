const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Menu = mongoose.model('Menu')

router.get('/', (req, res) => {
  Menu.find({}).populate(req.query.populate).sort('name').exec((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(menu)
    }
  })
})

router.get('/:id', (req, res) => {
  Menu.findOne({
    slug: req.params.id
  }).exec((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(menu)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newMenu = new Menu(req.body)
  newMenu.site = req.payload.site
  newMenu.slug = slugify(newMenu.name).toLowerCase()
  newMenu.save((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(menu)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Menu.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(menu)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Menu.findOne({
    slug: req.params.id
  }).populate('projects').exec((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (menu.projects && menu.projects.length) {
      res.status(422).send('Não é possível excluír! Existem projetos cadastrados nesta linha de ação')
    } else {
      menu.remove()
      res.send(menu)
    }
  })
})

module.exports = router
