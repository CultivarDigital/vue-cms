const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ContactSchema = new mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
module.exports = Contact
