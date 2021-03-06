const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const PageSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true,
    min: 1
  },
  tags: [String],
  docs: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
  title: String,
  description: String,
  content: String,
  images: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
  components: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PageSchema.plugin(require('mongoose-autopopulate'))

PageSchema.plugin(uniqueValidator, {
  message: 'Esta URL já está sendo usada'
})

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)
module.exports = Page
