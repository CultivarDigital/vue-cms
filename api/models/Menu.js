const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const MenuSchema = mongoose.Schema({
  menu: {
    type: ObjectId,
    ref: 'Menu'
  },
  page: {
    type: ObjectId,
    ref: 'Page'
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

MenuSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

MenuSchema.virtual('submenus', {
  ref: 'Menu',
  localField: '_id',
  foreignField: 'menu',
  options: { sort: { order: 1 } }
})

const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)
module.exports = Menu
