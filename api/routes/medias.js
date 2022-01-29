const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const mediaTypes = require('../../data/media-types.json')
const Media = mongoose.model('Media')

router.get('/', async (req, res) => {
  const query = {}

  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { tags: { $regex: req.query.search, $options: 'i' } }
    ]
  }
  if (req.query.category) {
    query.categories = req.query.category
  }
  if (req.query.tag) {
    query.tags = req.query.tag
  }
  if (req.query.type) {
    query.type = req.query.type
  }

  const pagination = {
    total: await Media.count(query),
    per_page: req.query.per_page || 30,
    page: req.query.page || 1
  }

  const response = { pagination, data: null }
  Media.find(query).populate(req.query.populate).skip((pagination.page - 1) * pagination.per_page).limit(pagination.per_page).sort({ createdAt: -1 }).exec((err, medias) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      response.data = medias
      res.json(response)
    }
  })
})

router.get('/tags', (req, res) => {
  const query = { }
  Media.find(query, 'tags').exec((err, medias) => {
    if (err) {
      res.status(422).send(err)
    } else {
      const tags = {}
      medias.forEach(media => {
        if (media && media.tags) {
          media.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => {
        return a.localeCompare(b)
      }))
    }
  })
})

router.get('/filters', (req, res) => {
  const query = { }
  Media.find(query, 'tags categories').exec((err, medias) => {
    if (err) {
      res.status(422).send(err)
    } else {
      const tags = {}
      const categories = {}
      medias.forEach(media => {
        if (media && media.tags) {
          media.tags.forEach(tag => {
            tags[tag] = true
          })
        }
        if (media && media.categories) {
          media.categories.forEach(category => {
            categories[category] = true
          })
        }
      })

      res.json({
        tags: Object.keys(tags).sort((a, b) => {
          return a.localeCompare(b)
        }),
        categories: Object.keys(categories).sort((a, b) => {
          return a.localeCompare(b)
        }),
        types: mediaTypes
      })
    }
  })
})

router.get('/:id', (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(media)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newMedia = new Media(req.body)
  if (!newMedia.publishing_date) {
    newMedia.publishing_date = new Date()
  }
  newMedia.save((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  Media.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      media.remove()
      res.send(media)
    }
  })
})

module.exports = router
