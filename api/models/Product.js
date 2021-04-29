const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ProductSchema = mongoose.Schema({
  deleted: Boolean,
  published: Boolean,
  site: {
    type: ObjectId,
    ref: 'Site',
    required: true
  },
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
  documents: [Object]
}, {
  timestamps: true
})

ProductSchema.virtual('qtd_ordered', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'items.product',
  options: { match: { deleted: { $ne: true } } },
  count: true
})

ProductSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'items.product',
  options: { match: { deleted: { $ne: true } } }
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = Product
