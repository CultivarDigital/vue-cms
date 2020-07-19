const mongoose = require('mongoose')

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
    required: true
  },
  description: String,
  contact: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

SiteSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'site'
})

export const Site = mongoose.models.Site || mongoose.model('Site', SiteSchema)
