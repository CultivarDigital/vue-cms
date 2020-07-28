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
    index: true,
    unique: true
  },
  content: String,
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PageSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

export const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)
