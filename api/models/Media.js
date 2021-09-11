const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const MediaSchema = mongoose.Schema({
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
  image: {
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  },
  documents: [Object],
  docs: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
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

MediaSchema.plugin(require('mongoose-autopopulate'))

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema)
module.exports = Media
