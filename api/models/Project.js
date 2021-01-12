const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const ProjectSchema = mongoose.Schema({
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
  pictures: [Object],
  pdfs: [Object],
  categories: [{
    type: ObjectId,
    ref: 'Category'
  }],
  tags: [String],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

ProjectSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
module.exports = Project
