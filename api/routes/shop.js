const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Product = mongoose.model('Product')
const Order = mongoose.model('Order')

router.get('/products', (req, res) => {
  const query = { deleted: { $ne: true }, published: true, qtd: { $gt: 0 } }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }
  }
  if (req.query.tag) {
    query.tags = req.query.tag
  }
  Product.find(query).populate('orders').exec((err, products) => {
    if (err) {
      res.status(422).send(err)
    } else {
      switch (req.query.sort) {
        case 'most_recent':
          products = products.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          break
        case 'best_sellers':
          products = products.sort((a, b) => {
            return b.qtd_ordered - a.qtd_ordered
          })
          break
        case 'alphabetical_order':
          products = products.sort((a, b) => {
            return a.name.localeCompare(b.name)
          })
          break
      }
      res.json(products)
    }
  })
})

router.get('/tags', (req, res) => {
  const query = { deleted: { $ne: true }, published: true, qtd: { $gt: 0 } }
  Product.find(query, 'tags').exec((err, products) => {
    if (err) {
      res.status(422).send(err)
    } else {
      const tags = {}
      products.forEach(product => {
        if (product && product.tags) {
          product.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => {
        return a.localeCompare(b)
      }))
    }
  })
})

router.get('/product/:id', (req, res) => {
  Product.findOne({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }).exec((err, product) => {
    if (err) {
      res.status(422).send(err)
    } else {
      res.json(product)
    }
  })
})

router.get('/related/:id', (req, res) => {
  Product.findOne({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }).exec(async (err, product) => {
    let relatedProducts = []
    if (product.tags) {
      relatedProducts = await Product.find({ tags: { $in: product.tags }, deleted: { $ne: true }, published: true, qtd: { $gt: 0 }, _id: { $ne: req.params.id } })
    }
    if (err) {
      res.status(422).send(err)
    } else {
      res.json(relatedProducts)
    }
  })
})

router.post('/order', auth.authenticated, (req, res) => {
  Order.find().sort({
    code: -1
  }).limit(1).exec((err, latest) => {
    if (!err) {
      const newOrder = new Order(req.body)

      newOrder.status = 'pending'
      newOrder.user = req.user._id

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

      newOrder.save((err, order) => {
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
