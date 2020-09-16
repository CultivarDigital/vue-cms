const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const municipios = require('../../data/municipios.json')
const PlantingArea = mongoose.model('PlantingArea')

router.get('/', (req, res) => {
  const query = {}
  if (req.query.user) {
    query.user = req.query.user
  }
  PlantingArea.find(query).populate(req.query.populate).sort('address.city, address.uf').exec((err, plantingAreas) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(plantingAreas)
    }
  })
})

router.get('/import', auth.authenticated, async (req, res) => {
  const plantingAreas = []
  for (const municipio of municipios) {
    const newPlantingArea = new PlantingArea()
    newPlantingArea.site = req.payload.site
    newPlantingArea.user = req.payload.id
    newPlantingArea.qtd = municipio.qtd
    newPlantingArea.address = {
      location: {
        type: 'Point',
        coordinates: municipio.location
      },
      uf: municipio.uf,
      city: municipio.name
    }
    const plantingArea = await newPlantingArea.save()
    plantingAreas.push(plantingArea)
  }
  res.json(plantingAreas)
})

router.get('/:id', (req, res) => {
  PlantingArea.findOne({
    _id: req.params.id
  }).exec((err, plantingArea) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(plantingArea)
    }
  })
})

router.post('/', auth.authenticated, (req, res) => {
  const newPlantingArea = new PlantingArea(req.body)
  newPlantingArea.site = req.payload.site
  newPlantingArea.user = req.payload.id
  newPlantingArea.save((err, plantingArea) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(plantingArea)
    }
  })
})

router.put('/:id', auth.authenticated, (req, res) => {
  const params = req.body
  PlantingArea.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, plantingArea) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(plantingArea)
    }
  })
})

router.delete('/:id', auth.authenticated, (req, res) => {
  PlantingArea.findOne({
    _id: req.params.id
  }).exec((err, plantingArea) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      plantingArea.remove()
      res.send(plantingArea)
    }
  })
})

module.exports = router
