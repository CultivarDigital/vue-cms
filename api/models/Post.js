const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema = mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  picture: Object,
  pdfs: [Object],
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PostSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
module.exports = Post
