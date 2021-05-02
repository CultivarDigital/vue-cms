const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const OrderItemSchema = require('./OrderItem')
const AddressSchema = require('./Address')

const OrderSchema = mongoose.Schema(
  {
    code: {
      type: Number,
      required: true
    },
    client: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    items: [OrderItemSchema],
    name: String,
    cpf: String,
    email: String,
    phone: String,
    address: AddressSchema,
    status: String
  },
  {
    timestamps: true
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
module.exports = Order
