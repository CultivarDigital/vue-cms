const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Newsletter = mongoose.model('Newsletter')

router.get('/', auth.admin, (req, res) => {
  const query = {}
  if (!req.payload.roles.includes('super')) {
    query.site = req.payload.site
  }
  Newsletter.find(query).sort('name').exec((err, newsletters) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(newsletters)
    }
  })
})

router.post('/newsletter', (req, res) => {
  const newsletter = new Newsletter()

  newsletter.site = req.body.site
  newsletter.name = req.body.name
  newsletter.email = req.body.email

  newsletter.save().then(() => {
    res.json(newsletter)
  }).catch(err => {
    res.status(422).send(err.message)
  })
})

module.exports = router
