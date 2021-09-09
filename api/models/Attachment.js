const mongoose = require('mongoose')

const AttachmentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  thumb: {
    type: String
  },
  average: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  link_title: {
    type: String
  }
})

const Attachment = mongoose.models.Attachment || mongoose.model('Attachment', AttachmentSchema)
module.exports = Attachment
