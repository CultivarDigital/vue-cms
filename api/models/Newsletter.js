const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const NewsletterSchema = new mongoose.Schema({
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
    required: true,
    unique: true,
    index: true
  }
}, {
  timestamps: true
})

NewsletterSchema.plugin(uniqueValidator, {
  message: 'Você já está cadastrado!'
})

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema)
