const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const PageSchema = mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site',
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true
  },
  categories: [{
    type: ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }],
  documents: [Object],
  title: String,
  description: String,
  content: String,
  pictures: [Object],
  pdfs: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PageSchema.index({ slug: 1, site: 1 }, { unique: true })

PageSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)
module.exports = Page
