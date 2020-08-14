const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const MaintenanceSchema = mongoose.Schema({
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

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export const Maintenance = mongoose.models.Maintenance || mongoose.model('Maintenance', MaintenanceSchema)
