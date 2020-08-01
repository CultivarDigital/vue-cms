const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Post = mongoose.model('Post')
const posts = require('../../data/posts.json')
const { downloadPicture, getAttrFromString, stripHtml } = require('../../utils/index')

router.get('/import', auth.admin, (req, res) => {
  Post.deleteMany({}).then(async () => {
    const list = []
    for (const post of posts) {
      let images = []
      if (post.description) {
        images = getAttrFromString(post.description, 'img', 'src')
      }
      if (post.media) {
        images.push(post.media)
      }
      images.forEach(image => {
        downloadPicture(image, req.payload.site_slug)
      })

      const newPost = new Post({
        site: req.payload.site,
        title: post.title.split(':::').join('').trim(),
        description: post.intro ? stripHtml(post.intro).split('&nbsp;').join(' ') : '',
        content: post.description ? post.description.split('https://nyc3.digitaloceanspaces.com/terrakryadev/').join('/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join('') : null,
        picture: post.media ? {
          url: post.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
          average: post.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
          thumb: post.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
        } : null,
        tags: post.tags
      })
      newPost.slug = slugify(newPost.title).toLowerCase()
      list.push(await newPost.save())
      // list.push(newPost)
    }
    res.json(list)
  })
})

router.get('/', (req, res) => {
  Post.find({}).populate(req.query.populate).sort({ createdAt: -1 }).exec((err, posts) => {
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
  newPost.slug = slugify(newPost.title).toLowerCase()
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
  params.slug = slugify(params.title).toLowerCase()
  Post.findOneAndUpdate({
    slug: req.params.id
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
