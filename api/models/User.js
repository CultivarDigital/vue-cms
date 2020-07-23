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
  name: String,
  email: {
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
  hash: String,
  salt: String,
  roles: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

UserSchema.plugin(uniqueValidator, {
  message: 'já está sendo usado'
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
    image: this.image,
    exp: parseInt(exp.getTime() / 1000)
  }, (process.env.SECRET || 'secret'))
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    site: this.site,
    email: this.email,
    token: this.generateJWT(),
    roles: this.roles,
    name: this.name,
    image: this.image
  }
}

UserSchema.methods.data = function() {
  return {
    _id: this._id,
    site: this.site,
    email: this.email,
    roles: this.roles,
    name: this.name,
    image: this.image
  }
}

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
