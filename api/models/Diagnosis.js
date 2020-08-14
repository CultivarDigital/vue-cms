const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const DiagnosisSchema = mongoose.Schema({
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

  original_vegetation: [String],
  year_of_deforestation: [String],
  previous_use_type: [String],
  duration_of_previous_use: [String],

  soil_type: [String],
  soil_moisture: [String],
  declivity: [String],
  soil_compaction: [String],
  soil_conservation: [String],
  soil_conservation_other: String,

  nearest_forest: Number,
  nearest_forest_vegetation: [String],
  fragment_size: [String],
  natural_regeneration: [String],

  presence_of_other_animals: String,
  firing_frequency: [String],
  firing_frequency_other: String,
  last_fire: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const Diagnosis = mongoose.models.Diagnosis || mongoose.model('Diagnosis', DiagnosisSchema)
