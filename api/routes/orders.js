const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authenticated, admin } = require('../config/auth')
const Order = mongoose.model('Order')

router.get('/', authenticated, function(req, res) {
  const query = { }

  if (req.user.roles.includes('client')) {
    query.client = req.user.id
  }

  Order.find(query)
    .populate({
      path: 'items.product',
      model: 'Product'
    })
    .sort({
      code: -1
    })
    .exec(function(err, orders) {
      if (err) {
        res.status(422).send(err)
      } else {
        res.json(orders)
      }
    })
})

router.get('/:id', authenticated, function(req, res) {
  const query = {
    _id: req.params.id
  }

  if (req.user.roles.includes('client')) {
    query.client = req.user.id
  }

  Order.findOne(query, select(req))
    .populate([
      'client',
      {
        path: 'items.product',
        model: 'Product'
      }
    ])
    .exec(function(err, order) {
      if (err) {
        res.status(422).send(err)
      } else {
        res.json(order)
      }
    })
})

router.put('/:id', admin, function(req, res) {
  const params = req.body
  const query = {
    _id: req.params.id
  }

  Order.findOne(query).exec(function(err, order) {
    if (err) {
      res
        .status(422)
        .send(err)
    } else {
      if (params.status) {
        order.status = params.status
      }
      order.save().then(function() {
        res.json(order)
      })
    }
  })
})

module.exports = router
