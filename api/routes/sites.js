const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Site = mongoose.model('Site')

router.get('/', (req, res) => {
  Site.find({}).exec((err, sites) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(sites)
    }
  })
})

router.get('/:id', auth.super, (req, res) => {
  Site.findOne({
    _id: req.params.id
  }).exec((err, site) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(site)
    }
  })
})

router.post('/', auth.super, (req, res) => {
  const site = new Site(req.body)
  newSite.slug = slugify(newSite.name).toLowerCase()
  newSite.save((err, site) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(site)
    }
  })
})

router.put('/:id', auth.super, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Site.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, site) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(site)
    }
  })
})

router.delete('/:id', auth.super, (req, res) => {
  Site.findOne({
    _id: req.params.id
  }).populate('users').exec((err, site) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (site.users && site.users.length) {
      res.status(422).send('Não é possível excluír! Existem usuários cadastrados neste site')
    } else {
      site.remove()
      res.send(site)
    }
  })
})

module.exports = router
