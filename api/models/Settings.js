const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const SettingsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
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
  banners: [Object],
  site_logo: {
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  },
  site_favicon: {
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  },
  site_banners: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
  postal_code: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

SettingsSchema.plugin(require('mongoose-autopopulate'))

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
module.exports = Settings
