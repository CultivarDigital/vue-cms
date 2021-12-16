const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const mendeley = require('../../data/mendeley.json')
const docTypes = require('../../data/document-types.json')
const Media = mongoose.model('Media')

const fieldOptions = (docs, column) => {
  const values = {}
  docs.forEach(d => {
    values[d[column]] = true
  })
  return Object.keys(values).sort((a, b) => a.localeCompare(b))
}

const fieldArrayOptions = (docs, column) => {
  const values = {}
  docs.forEach(d => {
    if (d[column]) {
      d[column].forEach(v => {
        values[v] = true
      })
    }
  })
  return Object.keys(values).sort((a, b) => a.localeCompare(b))
}

router.get('/import', (req, res) => {
  const medias = {
    langs: [],
    languages: [],
    fields: [],
    types: [],
    list: []
  }
  const fields = {}

  mendeley.forEach(d => {
    const m = new Media()
    m.aditional_infos = []
    m.title = d.title
    m.type = docTypes[d.type]
    m.authors = d.authors
    m.description = d.abstract

    if (d.editors && d.editors.length) {
      if (d.type === 'thesis') {
        m.aditional_infos.push({ label: 'Orientadores', value: d.editors.map(editor => Object.values(editor).join(' ').replace('Orientador: ', '')).join(', ') })
      } else {
        m.organizers = d.editors
      }
    }

    if (d.identifiers && d.identifiers.doi) {
      m.doi = d.identifiers.doi
    }

    m.institution = d.institution
    m.number = d.institution

    m.tags = d.keywords
    m.categories = d.tags

    if (d.language) {
      m.languages = d.language
        .replace('/', '; ')
        .split('; ').map(l => {
          if (l === 'ing' || l === 'Ing' || l === 'inglês') {
            return 'Inglês'
          }
          if (l === 'por' || l === 'Por' || l === 'POR' || l === 'português') {
            return 'Português'
          }
          if (l === 'esp') {
            return 'Espanhol'
          }
          return l
        })
    }

    m.notes = d.notes
    m.pages = d.pages
    m.patent_legal_status = d.patent_legal_status
    m.publishing_house = d.publisher

    if (d.series) {
      m.aditional_infos.push({ label: 'Serie', value: d.series })
    }

    m.source = d.source
    m.volume = d.volume
    if (d.year) {
      m.publishing_date = new Date(d.year, 0, 1)
      m.publishing_date_format = 'YYYY'
    }

    Object.keys(d).forEach(k => {
      fields[k] = true
    })

    medias.list.push(m)
  })

  medias.langs = fieldOptions(mendeley, 'language')
  medias.languages = fieldArrayOptions(medias.list, 'languages')

  medias.fields = Object.keys(fields).sort((a, b) => a.localeCompare(b))
  res.json(medias)
})

router.get('/', (req, res) => {
  const query = {}

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }
  if (req.query.category) {
    query.category = req.query.category
  }
  if (req.query.tag) {
    query.tags = req.query.tag
  }

  Media.find(query).populate(req.query.populate).sort({ createdAt: -1 }).exec((err, medias) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(medias)
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
