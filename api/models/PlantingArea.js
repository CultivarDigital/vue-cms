const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const PlantingAreaSchema = mongoose.Schema({
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
  qtd: {
    type: Number,
    required: true
  },
  address: AddressSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const PlantingArea = mongoose.models.PlantingArea || mongoose.model('PlantingArea', PlantingAreaSchema)
