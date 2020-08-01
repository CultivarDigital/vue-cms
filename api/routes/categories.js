const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Category = mongoose.model('Category')
const categories = require('../../data/categories.json')
const { downloadPicture, getAttrFromString, stripHtml } = require('../../utils/index')

router.get('/import', auth.admin, (req, res) => {
  Category.deleteMany({}).then(async () => {
    const list = []
    for (const category of categories) {
      let images = []
      if (category.description) {
        images = getAttrFromString(category.description, 'img', 'src')
      }
      if (category.media) {
        images.push(category.media)
      }
      if (category.icon) {
        images.push(category.icon)
      }

      images.forEach(image => {
        downloadPicture(image, req.payload.site_slug)
      })

      const newCategory = new Category({
        site: req.payload.site,
        slug: category.slug,
        name: category.name.split(':::').join('').trim(),
        description: category.intro ? stripHtml(category.intro).split('&nbsp;').join(' ') : '',
        content: category.description ? category.description.split('https://nyc3.digitaloceanspaces.com/terrakryadev/').join('/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join('') : null,
        picture: category.media ? {
          url: category.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
          average: category.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
          thumb: category.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
        } : null,
        icon: category.icon ? {
          url: category.icon.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
          average: category.icon.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
          thumb: category.icon.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
        } : null
      })
      list.push(await newCategory.save())
      // list.push(newCategory)
    }
    res.json(list)
  })
})

router.get('/', (req, res) => {
  Category.find({}).populate(req.query.populate).sort('name').exec((err, categories) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(categories)
    }
  })
})

router.get('/:id', (req, res) => {
  Category.findOne({
    slug: req.params.id
  }).exec((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(category)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newCategory = new Category(req.body)
  newCategory.site = req.payload.site
  newCategory.slug = slugify(newCategory.name).toLowerCase()
  newCategory.save((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(category)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Category.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(category)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Category.findOne({
    slug: req.params.id
  }).populate('projects').exec((err, category) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (category.projects && category.projects.length) {
      res.status(422).send('Não é possível excluír! Existem projetos cadastrados nesta linha de ação')
    } else {
      category.remove()
      res.send(category)
    }
  })
})

module.exports = router
