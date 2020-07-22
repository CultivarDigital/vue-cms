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
  pictures: [Object],
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

ProjectSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
