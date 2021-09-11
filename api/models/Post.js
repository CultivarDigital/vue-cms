const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const PostSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true,
    min: 1
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
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
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PostSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

PostSchema.plugin(require('mongoose-autopopulate'))

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
module.exports = Post
