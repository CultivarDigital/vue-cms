const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Tag = mongoose.model('Tag')
const tags = require('../../data/tags.json')
const { downloadPicture, getAttrFromString, stripHtml } = require('../../utils/index')

router.get('/import', auth.admin, (req, res) => {
  Tag.deleteMany({}).then(async () => {
    let list = []
    for (tag of tags) {
      let images = []
      if (tag.description) {
        images = getAttrFromString(tag.description, 'img', 'src')
      }
      if (tag.media) {
        images.push(tag.media)
      }

      images.forEach(image => {
        downloadPicture(image, 'associacao-floresta-protegida')
      })

      const newTag = new Tag({
        site: req.payload.site,
        slug: tag.slug,
        name: tag.name.split(':::').join('').trim(),
        description: tag.intro ? stripHtml(tag.intro).split('&nbsp;').join(' ') : '',
        content: tag.description ? tag.description.split('https://nyc3.digitaloceanspaces.com/terrakryadev/').join('/api/uploads/associacao-floresta-protegida/images/averages/') : null,
        picture: {
          url: tag.media ? tag.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/associacao-floresta-protegida/images/') : null,
          average: tag.media ? tag.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/associacao-floresta-protegida/images/averages/') : null,
          thumb: tag.media ? tag.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/associacao-floresta-protegida/images/thumbs/') : null
        }
      })
      list.push(await newTag.save())
    }
    res.json(list)
  })
})

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
    slug: req.params.id
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
    slug: req.params.id
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
    slug: req.params.id
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
