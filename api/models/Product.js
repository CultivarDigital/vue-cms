const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ProductSchema = mongoose.Schema({
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
  price: Number,
  qtd: Number,
  published: Boolean,
  categories: [String]
}, {
  timestamps: true
})

ProductSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'items.product',
  options: { match: { deleted: { $ne: true } } }
})

mongoose.model('Product', ProductSchema)
