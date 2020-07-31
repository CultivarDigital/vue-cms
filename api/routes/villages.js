const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Village = mongoose.model('Village')
const villages = require('../../data/villages.json')
const { downloadPicture, getAttrFromString, stripHtml } = require('../../utils/index')

router.get('/import', auth.admin, (req, res) => {
  Village.deleteMany({}).then(async () => {
    let list = []
    for (village of villages) {
      let images = village.photos || []

      images.forEach(image => {
        downloadPicture(image, req.payload.site_slug)
      })

      const newVillage = new Village({
        site: req.payload.site,
        slug: village.slug,
        name: village.name.split(':::').join('').trim(),
        pictures: village.photos ? village.photos.map(photo => {
          return {
            url: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
            average: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
            thumb: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
          }
        }) : [],
      })
      list.push(await newVillage.save())
      list.push(newVillage)
    }
    res.json(list)
  })
})

router.get('/', (req, res) => {
  Village.find({}).populate(req.query.populate).sort('name').exec((err, villages) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(villages)
    }
  })
})

router.get('/:id', (req, res) => {
  Village.findOne({
    slug: req.params.id
  }).exec((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(village)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newVillage = new Village(req.body)
  newVillage.site = req.payload.site
  newVillage.slug = slugify(newVillage.name).toLowerCase()
  newVillage.save((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(village)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Village.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(village)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Village.findOne({
    slug: req.params.id
  }).exec((err, village) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      village.remove()
      res.send(village)
    }
  })
})

module.exports = router
