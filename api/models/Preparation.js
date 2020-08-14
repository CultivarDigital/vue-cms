const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const PreparationSchema = mongoose.Schema({
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

  herbicide_use: String,
  herbicide: String,
  herbicide_frequency: String,
  overgrazing:    String,
  overgrazing_frequency: String,
  soil_preparation: [String],
  screenings_number: Number,
  screenings_frequency: String,
  levels_number: Number,
  semi_mechanized_mowing_number: Number,
  manual_mowing_number: Number,
  mowing_frequency: String,
  fertilizing: [String],
  fertilizing_other: String,


}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const Preparation = mongoose.models.Preparation || mongoose.model('Preparation', PreparationSchema)
