const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SiteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  domain_name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  description: String,
  contact: String,
  email: String,
  url_facebook: String,
  url_youtube: String,
  url_twitter: String,
  url_instagram: String,
  logo: Object,
  favicon: Object,
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

SiteSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

SiteSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('pages', {
  ref: 'Page',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('tags', {
  ref: 'Tag',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('learning_units', {
  ref: 'LearningUnit',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('seeds_networks', {
  ref: 'SeedsNetwork',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('service_providers', {
  ref: 'ServiceProvider',
  localField: '_id',
  foreignField: 'site'
})

SiteSchema.virtual('planting_areas', {
  ref: 'PlantingArea',
  localField: '_id',
  foreignField: 'site'
})

export const Site = mongoose.models.Site || mongoose.model('Site', SiteSchema)
