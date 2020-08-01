const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const sharp = require('sharp')
const auth = require('../config/auth')
const { PDFImage } = require('pdf-image')
const mongoose = require('mongoose')

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

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    var filename = file.originalname
    let path = imagesPath(req.payload.site_slug)
    if (fs.existsSync(path+filename)){
      var nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})
var imageUploader = multer({
  storage: imageStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})

router.post('/images', [auth.authenticated, imageUploader.single('image')], (req, res) => {
  const filename = req.file.filename
  console.log('req.payload');
  console.log(req.payload);
  let path = imagesPath(req.payload.site_slug)

  const original = imagesPath(req.payload.site_slug) + filename
  const thumb = thumbsPath(req.payload.site_slug) + filename
  const average = averagesPath(req.payload.site_slug) + filename

  sharp(original, { failOnError: false })
    .resize(400)
    .toFile(thumb, function(err) {
      if (!err) {
        sharp(original, { failOnError: false })
          .resize(1600)
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

var documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    var filename = file.originalname
    let path = documentsPath(req.payload.site_slug)
    if (fs.existsSync(path+filename)){
      var nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})
var documentUploader = multer({
  storage: documentStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})
router.post('/documents', [auth.authenticated, documentUploader.single('document')], (req, res) => {
  var url = req.file.filename
  let path = documentsPath(req.payload.site_slug)
  res.status(201).send(path + url)
})

const pdfsPath = (slug) => {
  let path = sitePath(slug)
  path += 'pdfs/'
  createPath(path)
  return path
}

var pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfsPath(req.payload.site_slug))
  },
  filename: (req, file, cb) => {
    var filename = file.originalname
    let path = pdfsPath(req.payload.site_slug)
    if (fs.existsSync(path+filename)){
      var nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})

var pdfUploader = multer({
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

  var pdfImage = new PDFImage(req.file.path)
  console.log('pdf loaded', pdfImage)

  pdfImage.convertPage(0).then(function(original) {
    console.log('averageConverted', original)
    sharp(original, { failOnError: false })
      .resize(400)
      .toFile(thumb, function(err) {
        if (err) {
          console.log("File upload error: ", err)
        }
        sharp(original, { failOnError: false })
          .resize(1600)
          .toFile(average, function(err) {
            if (err) {
              console.log("File upload error: ", err)
            }

            res.status(201).send({
              url: '/' + req.file.path,
              average: '/' + average,
              thumb: '/' + thumb
            })
          })

      })

  }).catch((e) => {
    console.log('err:', e)
  })
})

module.exports = router
