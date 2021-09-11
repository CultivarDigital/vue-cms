const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ProductSchema = mongoose.Schema({
  deleted: Boolean,
  published: Boolean,
  slug: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  qtd: {
    type: Number,
    required: true
  },
  tags: [String],
  pictures: [Object],
  images: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],
  documents: [Object],
  docs: [{
    type: ObjectId,
    ref: 'Attachment',
    autopopulate: true
  }],

  // shipping
  weight: Number,
  format: Number,
  length: Number,
  height: Number,
  width: Number,
  diameter: Number,
  shipping_services: [String]

}, {
  timestamps: true
})

ProductSchema.plugin(require('mongoose-autopopulate'))

ProductSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'items.product',
  options: { match: { deleted: { $ne: true } } }
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = Product
