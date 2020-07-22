const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Post = mongoose.model('Post')

router.get('/', (req, res) => {
  Post.find({}).populate(req.params.populate).exec((err, posts) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(posts)
    }
  })
})

router.get('/:id', (req, res) => {
  Post.findOne({
    slug: req.params.id
  }).exec((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(post)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newPost = new Post(req.body)
  newPost.site = req.payload.site
  newPost.slug = slugify(newPost.name).toLowerCase()
  newPost.save((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(post)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Post.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(post)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Post.findOne({
    _id: req.params.id
  }).exec((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      post.remove()
      res.send(post)
    }
  })
})

module.exports = router
