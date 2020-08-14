const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const MonitoringSchema = mongoose.Schema({
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

  trees_established_per_hectare: Number,
  species_established_in_total_area: Number,
  percentage_of_canopy_coverage: Number,
  percentage_of_soil_coverage: Number
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const Monitoring = mongoose.models.Monitoring || mongoose.model('Monitoring', MonitoringSchema)
