const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PageSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true,
    min: 1
  },
  tags: [String],
  documents: [Object],
  title: String,
  description: String,
  content: String,
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PageSchema.plugin(uniqueValidator, {
  message: 'Esta URL já está sendo usada'
})

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)
module.exports = Page
