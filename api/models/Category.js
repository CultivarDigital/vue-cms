const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const CategorySchema = mongoose.Schema({
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
  picture: Object,
  icon: Object
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

CategorySchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

CategorySchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'category'
})

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)
module.exports = Category
