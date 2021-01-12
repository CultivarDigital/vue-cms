const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const MediaSchema = mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: String,
  tags: [String],
  picture: Object,
  pdf: Object,
  url: String,
  oembed: String,
  publishing_date: Date,
  publishing_date_format: {
    type: String,
    default: 'DD/MM/YYYY'
  },
  publishing_house: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema)
module.exports = Media
