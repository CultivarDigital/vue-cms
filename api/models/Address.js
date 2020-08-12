const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  location: {
    type: {
      type: String
    },
    coordinates: []
  },
  city: String,
  uf: String,
  street: String,
  number: String,
  neighborhood: String,
  complement: String,
  postal_code: String,
  description: String,
  source: Object,
  address: String
})

AddressSchema.index({ location: '2dsphere' })

module.exports = AddressSchema
