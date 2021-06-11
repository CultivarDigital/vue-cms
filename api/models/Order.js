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
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    items: [OrderItemSchema],
    name: String,
    email: String,
    organization: String,
    address: AddressSchema,
    phone: String,
    cpf_cnpj: String,
    status: String
  },
  {
    timestamps: true
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
module.exports = Order
