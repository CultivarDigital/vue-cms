const fs = require('fs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { PDFImage } = require('pdf-image')
const axios = require('axios')
const auth = require('../config/auth')

const createPath = (path) => {
  !fs.existsSync(path) && fs.mkdirSync(path)
}

const UPLOAD_PATH = 'api/uploads/'
createPath(UPLOAD_PATH)

const sitePath = (slug) => {
  let path = UPLOAD_PATH
  path += (slug || 'global') + '/'
  createPath(path)
  return path
}

const imagesPath = (slug) => {
  let path = sitePath(slug)
  path += 'images/'
  createPath(path)
  return path
}

const thumbsPath = (slug) => {
  let path = imagesPath(slug)
  path += 'thumbs/'
  createPath(path)
  return path
}

const averagesPath = (slug) => {
  let path = imagesPath(slug)
  path += 'averages/'
  createPath(path)
  return path
}

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    let filename = file.originalname
    const path = imagesPath(req.payload.site_slug)
    if (fs.existsSync(path + filename)) {
      const nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})
const imageUploader = multer({
  storage: imageStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})

router.post('/images', [auth.authenticated, imageUploader.single('image')], (req, res) => {
  const filename = req.file.filename

  const original = imagesPath(req.payload.site_slug) + filename
  const thumb = thumbsPath(req.payload.site_slug) + filename
  const average = averagesPath(req.payload.site_slug) + filename

  sharp(original, { failOnError: false })
    .resize({
      width: 400,
      withoutEnlargement: true
    })
    .toFile(thumb, function(err) {
      if (!err) {
        sharp(original, { failOnError: false })
          .resize({
            width: 1600,
            withoutEnlargement: true
          })
          .toFile(average, function(err) {
            if (!err) {
              res.status(201).send({
                title: '',
                url: '/' + original,
                thumb: '/' + thumb,
                average: '/' + average
              })
            }
          })
      }
    })
})

const documentsPath = (slug) => {
  let path = sitePath(slug)
  path += 'documents/'
  createPath(path)
  return path
}

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    let filename = file.originalname
    const path = documentsPath(req.payload.site_slug)
    if (fs.existsSync(path + filename)) {
      const nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})
const documentUploader = multer({
  storage: documentStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})
router.post('/documents', [auth.authenticated, documentUploader.single('document')], (req, res) => {
  const url = req.file.filename
  const path = documentsPath(req.payload.site_slug)
  res.status(201).send(path + url)
})

const pdfsPath = (slug) => {
  let path = sitePath(slug)
  path += 'pdfs/'
  createPath(path)
  return path
}

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfsPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    let filename = file.originalname
    const path = pdfsPath(req.payload.site_slug)
    if (fs.existsSync(path + filename)) {
      const nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})

const pdfUploader = multer({
  storage: pdfStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})
router.post('/pdfs', [auth.authenticated, pdfUploader.single('pdf')], (req, res) => {
  const filename = req.file.filename

  // let path = pdfsPath(req.payload.site_slug)

  // const original = imagesPath(req.payload.site_slug) + filename
  const thumb = thumbsPath(req.payload.site_slug) + filename.replace('.pdf', '.png')
  const average = averagesPath(req.payload.site_slug) + filename.replace('.pdf', '.png')

  const pdfImage = new PDFImage(req.file.path)

  pdfImage.convertPage(0).then(function(original) {
    sharp(original, { failOnError: false })
      .resize(400)
      .toFile(thumb, function(err) {
        if (!err) {
          sharp(original, { failOnError: false })
            .resize(1600)
            .toFile(average, function(err) {
              if (!err) {
                res.status(201).send({
                  url: '/' + req.file.path,
                  average: '/' + average,
                  thumb: '/' + thumb
                })
              }
            })
        }
      })
  }).catch(() => {})
})

router.get('/oembed', async (req, res) => {
  const rawData = await axios.get('http://open.iframe.ly/api/oembed?url=' + req.query.url + '&origin=diegomr86').catch(() => {})
  if (rawData && rawData.data) {
    res.json(rawData.data)
  } else {
    res.status(404).send('Não foi possível carregar o conteúdo do link')
  }
})

module.exports = router
