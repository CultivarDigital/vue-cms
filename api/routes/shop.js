const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../auth')
const Product = mongoose.model('Product')
const Order = mongoose.model('Order')

router.get('/products', function (req, res) {
  const query = { published: true }

  Product.find(query).exec(function (err, products) {
    if (err) {
      res.status(422).send(err)
    } else {
      products = products.filter(product => {
        return (product.qtd - product.qtd_ordered) > 0
      })
      res.json(products)
    }
  })
})

router.get('/categories', function (req, res) {
  const query = { published: true }
  Product.find(query, 'categories').exec(function (err, products) {
    if (err) {
      res.status(422).send(err)
    } else {
      const categories = {}
      products.forEach(product => {
        if (product && product.categories) {
          product.categories.forEach(tag => {
            categories[tag.text] = true
          })
        }
      })
      res.json(Object.keys(categories).sort(function (a, b) {
        return a.localeCompare(b)
      }))
    }
  })
})

router.get('/product/:id', function(req, res) {
  Product.findOne({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }).exec(function(err, product) {
    if (err) {
      res.status(422).send(err)
    } else {
      res.json(product)
    }
  })
})

router.post('/order', auth.client, function(req, res) {
  Order.find().sort({
    code: -1
  }).limit(1).exec((err, latest) => {
    if (!err) {
      const newOrder = new Order(req.body)
      newOrder.client = req.user.id
      if (latest && latest.length) {
        newOrder.code = latest[0].code + 1
      } else {
        newOrder.code = 1
      }

      req.body.cart.forEach(item => {
        newOrder.items.push({
          product: item.product._id,
          qtd: item.qtd,
          price: item.product.price,
          total: item.qtd * item.product.price
        })
      })

      newOrder.save(function (err, order) {
        if (err) {
          res.status(422).send(err)
        } else {
          res.send(order)
        }
      })
    }
  })
})

module.exports = router
