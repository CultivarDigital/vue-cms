const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId
const AddressSchema = require('./Address')

const LearningUnitSchema = mongoose.Schema({
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

  name: {
    type: String,
    required: true
  },
  planting_time: {
    type: String,
    required: true
  },
  area_size: {
    type: Number,
    required: true
  },
  address: AddressSchema,
  pictures: [Object],

  receive_technical_visits: Boolean,
  availability_for_technical_visits: String,
  responsible_for_technical_visits: String,

  original_vegetation: String,
  year_of_deforestation: String,
  previous_use_type: String,
  duration_of_previous_use: String,

  soil_type: String,
  soil_moisture: String,
  declivity: String,
  soil_compaction: String,
  soil_conservation: String,
  soil_conservation_other: String,

  nearest_forest: Number,
  nearest_forest_vegetation: String,
  fragment_size: String,
  natural_regeneration: String,

  presence_of_other_animals: String,
  firing_frequency: String,
  firing_frequency_other: String,
  last_fire: String,

  herbicide_use: String,
  herbicide: String,
  herbicide_frequency: String,
  overgrazing: String,
  overgrazing_frequency: String,
  soil_preparation: String,
  screenings_number: Number,
  screenings_frequency: String,
  levels_number: Number,

  semi_mechanized_mowing_number: Number,
  manual_mowing_number: Number,
  mowing_frequency: String,

  city: String,
  state: String,
  biome: String,
  vegetation_type: String,
  property_features: String,
  restoration_system: String,
  restoration_system_other: String,
  restoration_system_implement: String,
  seeds_planted: Number,
  seeds_investment: Number,

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

LearningUnitSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

export const LearningUnit = mongoose.models.LearningUnit || mongoose.model('LearningUnit', LearningUnitSchema)
