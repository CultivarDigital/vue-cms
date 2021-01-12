const crypto = require('crypto')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const ObjectId = mongoose.Schema.Types.ObjectId

mongoose.set('useCreateIndex', true)

const UserSchema = new mongoose.Schema({
  site: {
    type: ObjectId,
    ref: 'Site'
  },
  site_slug: String,
  name: String,
  email: {
    required: true,
    unique: true,
    type: String,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'inválido'],
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' } }
    },
    default: null
  },
  organization: String,
  picture: Object,
  hash: String,
  salt: String,
  roles: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

UserSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    email: this.email,
    roles: this.roles,
    site: this.site,
    site_slug: this.site_slug,
    name: this.name,
    picture: this.picture,
    organization: this.organization,
    address: this.address,
    exp: parseInt(exp.getTime() / 1000)
  }, (process.env.SECRET || 'secret'))
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    site: this.site,
    site_slug: this.site_slug,
    email: this.email,
    token: this.generateJWT(),
    roles: this.roles,
    name: this.name,
    picture: this.picture,
    organization: this.organization,
    address: this.address
  }
}

UserSchema.methods.data = function() {
  return {
    _id: this._id,
    site: this.site,
    site_slug: this.site_slug,
    email: this.email,
    roles: this.roles,
    name: this.name,
    picture: this.picture,
    organization: this.organization,
    address: this.address
  }
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)
module.exports = User
