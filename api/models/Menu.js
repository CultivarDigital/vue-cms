const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const MenuSchema = mongoose.Schema({
  menu: {
    type: ObjectId,
    ref: 'Menu'
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

MenuSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})
const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)
module.exports = Menu
