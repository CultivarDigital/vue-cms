const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  domain_name: String,
  description: String,
  contact: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

SiteSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'site'
});

export const Site = mongoose.models.Site || mongoose.model('Site', SiteSchema);
