const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Attachment = mongoose.model('Attachment')

router.get('/', (req, res) => {
  Attachment.find().populate(req.query.populate).sort({ createdAt: -1 }).exec((err, attachments) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(attachments)
    }
  })
})

router.get('/:id', (req, res) => {
  Attachment.findOne({
    slug: req.params.id
  }).exec((err, attachment) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(attachment)
    }
  })
})

router.put('/:id', auth.admin, async (req, res) => {
  const params = req.body
  const attachment = await Attachment.findOne({ _id: req.params.id })
  Object.keys(params).forEach(key => {
    attachment[key] = params[key]
  })
  await attachment.save().then(async attachment => {
    res.send(await Attachment.findById(attachment._id))
  }).catch(err => {
    res.status(422).send(err.message)
  })
})

module.exports = router
