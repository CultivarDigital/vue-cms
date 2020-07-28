const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const sharp = require('sharp')
const auth = require('../config/auth')
const { PDFImage } = require('pdf-image')

const UPLOAD_PATH = 'api/uploads/'
const IMAGES_PATH = UPLOAD_PATH + 'images/'
const THUMBS_PATH = UPLOAD_PATH + 'thumbs/'
const DOCUMENTS_PATH = UPLOAD_PATH + 'documents/'
const PDFS_PATH = UPLOAD_PATH + 'pdfs/'
const AUDIOS_PATH = UPLOAD_PATH + 'audios/'
const IMPORTS_PATH = UPLOAD_PATH + 'import/'
!fs.existsSync(UPLOAD_PATH) && fs.mkdirSync(UPLOAD_PATH)
!fs.existsSync(IMAGES_PATH) && fs.mkdirSync(IMAGES_PATH)
!fs.existsSync(THUMBS_PATH) && fs.mkdirSync(THUMBS_PATH)
!fs.existsSync(DOCUMENTS_PATH) && fs.mkdirSync(DOCUMENTS_PATH)
!fs.existsSync(PDFS_PATH) && fs.mkdirSync(PDFS_PATH)
!fs.existsSync(AUDIOS_PATH) && fs.mkdirSync(AUDIOS_PATH)
!fs.existsSync(IMPORTS_PATH) && fs.mkdirSync(IMPORTS_PATH)

var imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, IMAGES_PATH)
  },
  filename: function(req, file, cb) {
    var filename = file.originalname
    if (fs.existsSync(IMAGES_PATH+filename)){
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
  var url = req.file.filename
  var original = IMAGES_PATH + url
  var thumb = THUMBS_PATH + url

  console.log('original');
  console.log(original);
  sharp(original)
    .resize(400)
    .toFile(thumb, function(err) {
      console.log(err);
      if (!err) {
        res.status(201).send({
          url: '/' + original,
          thumb: '/' + thumb
        })
      }
    })
})

var documentStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, DOCUMENTS_PATH)
  },
  filename: function(req, file, cb) {
    var filename = file.originalname
    if (fs.existsSync(DOCUMENTS_PATH+filename)){
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
  res.status(201).send(DOCUMENTS_PATH + url)
})

var pdfStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, PDFS_PATH)
  },
  filename: function(req, file, cb) {
    var filename = file.originalname
    if (fs.existsSync(PDFS_PATH+filename)){
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
  var url = req.file.filename
  var thumb = THUMBS_PATH + url
  var medium = IMAGES_PATH + url
  medium = medium.replace('.pdf', '.png')
  thumb = thumb.replace('.pdf', '.png')
  url = UPLOAD_PATH + 'pdfs/' + url

  var pdfImage = new PDFImage(url)
  console.log('pdf loaded', pdfImage)

  pdfImage.convertPage(0).then(function(imagePath) {
    console.log('mediumConverted', imagePath)
    sharp(imagePath)
      .resize(100)
      .toFile(thumb, function(err) {
        if (err) {
          console.log("File upload error: ", err)
        }
        sharp(imagePath)
          .resize(600)
          .toFile(medium, function(err) {
            if (err) {
              console.log("File upload error: ", err)
            }
            // fs.unlink(UPLOAD_PATH + '/pdfs/' + url, function(err) {})
            // fs.unlink(imagePath, function(err) {})

            res.status(201).send({
              url: '/' + url,
              medium: '/' + medium,
              thumb: '/' + thumb
            })
          })

      })

  }).catch((e) => {
    console.log('err:', e)
  })
})

var audioStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, AUDIOS_PATH)
  },
  filename: function(req, file, cb) {
    var filename = file.originalname
    if (fs.existsSync(AUDIOS_PATH+filename)){
      var nameArr = filename.split('.')
      nameArr[0] += '-' + Date.now()
      filename = nameArr.join('.')
    }
    cb(null, filename)
  }
})
var audioUploader = multer({
  storage: audioStorage,
  limits: {
    fileSize: 32 * 1024 * 1024
  }
})
router.post('/audios', [auth.authenticated, audioUploader.single('audio')], (req, res) => {
  var url = req.file.filename
  res.status(201).send(AUDIOS_PATH + url)
})

module.exports = router
