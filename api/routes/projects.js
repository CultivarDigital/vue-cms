const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Project = mongoose.model('Project')
const Tag = mongoose.model('Tag')
const Category = mongoose.model('Category')
const projects = require('../../data/projects.json')
const { downloadPicture, getAttrFromString, stripHtml } = require('../../utils/index')

router.get('/import', auth.admin, (req, res) => {
  Project.deleteMany({}).then(async () => {
    const list = []
    let order = 0
    for (const project of projects.sort((a, b) => a.name.localeCompare(b.name))) {
      let images = []
      const pictures = []

      if (project.description) {
        images = getAttrFromString(project.description, 'img', 'src')
      }
      if (project.media) {
        images.push(project.media)
        pictures.push({
          url: project.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
          average: project.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
          thumb: project.media.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
        })
      }
      project.photos.forEach(photo => {
        images.push(photo)
        pictures.push({
          url: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/').split('%20').join(''),
          average: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join(''),
          thumb: photo.replace('https://nyc3.digitaloceanspaces.com/terrakryadev/', '/api/uploads/' + req.payload.site_slug + '/images/thumbs/').split('%20').join('')
        })
      })
      images.forEach(image => {
        downloadPicture(image, req.payload.site_slug)
      })

      const tags = []
      for (const tag of project.tags) {
        const t = await Tag.findOne({ slug: tag.slug })
        tags.push(t._id)
      }
      const categories = []
      for (const category of project.categories) {
        const c = await Category.findOne({ slug: category.slug })
        categories.push(c._id)
      }
      const newProject = new Project({
        site: req.payload.site,
        slug: project.slug,
        name: project.name.split(':::').join('').trim(),
        description: project.intro ? stripHtml(project.intro).split('&nbsp;').join(' ') : '',
        content: project.description ? project.description.split('https://nyc3.digitaloceanspaces.com/terrakryadev/').join('/api/uploads/' + req.payload.site_slug + '/images/averages/').split('%20').join('') : null,
        pictures,
        tags,
        categories,
        order
      })

      list.push(await newProject.save())
      // list.push(newProject)
      order += 1
    }
    res.json(list)
  })
})

router.get('/', (req, res) => {
  Project.find({}).populate(req.query.populate).sort('order').exec((err, projects) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(projects)
    }
  })
})

router.get('/:id', (req, res) => {
  Project.findOne({
    slug: req.params.id
  }).exec((err, project) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(project)
    }
  })
})

router.post('/reorder', auth.admin, async (req, res) => {
  for (const item in req.body) {
    await Project.findOneAndUpdate({
      slug: req.body[item].slug
    }, {
      $set: { order: req.body[item].order }
    }, {
      upsert: true
    })
  }
  res.json('ok')
})

router.post('/', auth.admin, (req, res) => {
  const newProject = new Project(req.body)
  newProject.site = req.payload.site
  newProject.slug = slugify(newProject.name).toLowerCase()
  // newProject.order = 0
  newProject.save((err, project) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(project)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.name).toLowerCase()
  Project.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, project) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(project)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Project.findOne({
    slug: req.params.id
  }).exec((err, project) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      project.remove()
      res.send(project)
    }
  })
})

module.exports = router
