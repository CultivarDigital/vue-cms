const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Settings = mongoose.model('Settings')

router.get('/', (req, res) => {
  Settings.findOne().exec((err, settings) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(settings)
    }
  })
})

router.post('/', auth.admin, async (req, res) => {
  let settings = await Settings.findOne()
  if (!settings) {
    settings = new Settings(req.body)
  }
  Object.keys(req.body).forEach(key => {
    settings[key] = req.body[key]
  })
  settings.save((err, settings) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(settings)
    }
  })
})

module.exports = router
