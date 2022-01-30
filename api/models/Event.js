const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  image: {
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  },
  docs: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
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

EventSchema.plugin(require('mongoose-autopopulate'))

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema)
module.exports = Event
