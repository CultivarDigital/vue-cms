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
  status: String,
  name: {
    type: String,
    required: true
  },
  description: {
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
  fertilizing: String,
  fertilizing_other: String,
  diagnosis_notes: String,
  diagnosis_pictures: [Object],

  city: String,
  state: String,
  biome: String,
  vegetation_type: String,
  property_features: String,
  restoration_system: String,
  restoration_system_other: String,
  restoration_system_implement: String,
  native_seeds_planted: Number,
  native_seeds_investment: Number,
  native_seeds_source: String,
  green_adubation_planted: Number,
  green_adubation_investment: Number,
  seedlings_planted: Number,
  seedlings_investment: Number,
  total_planting_cost: String,
  planting_notes: String,
  planting_pictures: [Object],

  monitoring_date: Date,
  trees_established_per_hectare: Number,
  species_established_in_total_area: Number,
  percentage_of_canopy_coverage: Number,
  percentage_of_soil_coverage: Number,
  monitoring_notes: String,
  monitoring_pictures: [Object]

}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

LearningUnitSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
})

export const LearningUnit = mongoose.models.LearningUnit || mongoose.model('LearningUnit', LearningUnitSchema)
