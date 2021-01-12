const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const EventSchema = mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  picture: Object,
  pdfs: [Object],
  tags: [String],
  start_at: Date,
  end_at: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

EventSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema)
module.exports = Event
