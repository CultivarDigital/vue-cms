const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const PlantingSchema = mongoose.Schema({
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
  learning_unit: {
    type: ObjectId,
    ref: 'LearningUnit',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  notes: String,
  pictures: [Object],
  pdfs: [Object],

  city: String,
  state: String,
  vegetation_type: [String],
  property_features: String,
  restoration_system: [String],
  restoration_system_other: String,
  restoration_system_implement: String,
  native_seeds_planted: Number,
  native_seeds_investment: Number,
  native_seeds_source: String,
  green_adubation_planted: Number,
  green_adubation_investment: Number,
  seedlings_planted: Number,
  seedlings_investment: Number,
  total_planting_cost: String

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const Planting = mongoose.models.Planting || mongoose.model('Planting', PlantingSchema)
