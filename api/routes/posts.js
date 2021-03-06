const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Post = mongoose.model('Post')

router.get('/', (req, res) => {
  Post.find().populate(req.query.populate).sort({ createdAt: -1 }).exec((err, posts) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(posts)
    }
  })
})

router.get('/current_tags', (req, res) => {
  Post.find().select('tags').exec((err, posts) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      const tags = {}
      posts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => a.localeCompare(b)))
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
  if (!newPost.slug) {
    newPost.slug = slugify(newPost.title).toLowerCase()
  }
  newPost.save(async (err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(await Post.findById(post._id))
    }
  })
})

router.put('/:id', auth.admin, async (req, res) => {
  const params = req.body
  const post = await Post.findOne({ _id: req.params.id })
  Object.keys(params).forEach(key => {
    post[key] = params[key]
  })
  await post.save().then(async post => {
    res.send(await Post.findById(post._id))
  }).catch(err => {
    res.status(422).send(err.message)
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Post.findOne({
    slug: req.params.id
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
