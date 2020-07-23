const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SiteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
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
  url_flickr: String,
  url_instagram: String,
  logo: Object,
  pictures: [Object],
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})


SiteSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

SiteSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'site'
})

export const Site = mongoose.models.Site || mongoose.model('Site', SiteSchema)
