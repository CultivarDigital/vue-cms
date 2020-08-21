const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const ServiceProviderSchema = mongoose.Schema({
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
  description: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  address: AddressSchema,
  pictures: [Object]

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

ServiceProviderSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

export const ServiceProvider = mongoose.models.ServiceProvider || mongoose.model('ServiceProvider', ServiceProviderSchema)
