const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const SeedsNetworkSchema = mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site',
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  status: String,
  name: {
    type: String,
    required: true
  },
  headquarters: String,
  address: AddressSchema,
  phones: [String],
  email: String,
  site_url: String,
  notes: String,
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

SeedsNetworkSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

export const SeedsNetwork = mongoose.models.SeedsNetwork || mongoose.model('SeedsNetwork', SeedsNetworkSchema)
