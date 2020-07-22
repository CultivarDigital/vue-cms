const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Project = mongoose.model('Project')

router.get('/', (req, res) => {
  Project.find({}).populate(req.params.populate).exec((err, projects) => {
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

router.post('/', auth.admin, (req, res) => {
  const newProject = new Project(req.body)
  newProject.site = req.payload.site
  newProject.slug = slugify(newProject.name).toLowerCase()
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
    _id: req.params.id
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
    _id: req.params.id
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
