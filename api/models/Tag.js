const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const TagSchema = mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  picture: Object
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

TagSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

TagSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'tags'
})

TagSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'tags'
})

export const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema)
module.exports = Tag
