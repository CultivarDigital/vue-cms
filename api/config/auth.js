const jwt = require('express-jwt')
const mongoose = require('mongoose')
const Site = mongoose.model('Site')

async function applySite(req, res, query, type) {
  const site = await belongsToSite(req)
  if (site) {
    if (type === 'user') {
      query.sites = site._id
    } else {
      query.site = site._id
    }
    return site
  } else if (!req.payload.roles.includes('super')) {
    res.status(401).send('Você não tem permissão para acessar este recurso')
    return false
  }
  return false
}

async function belongsToSite(req) {
  const site = await getSite(req)
  if (site && req.payload.sites) {
    if (req.payload.sites.includes(site.id)) {
      return site
    } else if (req.payload.sites && req.payload.sites.length) {
      return site[0]
    }
  }
  return false
}

async function getSite(req) {
  let filters = {
    domain_name: req.headers.host.replace('www.', '')
  }
  if (req.query.change_site) {
    filters = {
      slug: req.query.change_site
    }
  }
  return await Site.findOne(filters)
}

function getTokenFromHeader(req) {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

function isSuper(req) {
  if (req.payload && req.payload.roles) {
    return req.payload.roles.includes('super')
  }
  return false
}

function isAdmin(req) {
  if (req.payload && req.payload.roles) {
    return req.payload.roles.includes('admin') || req.payload.roles.includes('super')
  }
  return false
}

function authenticatedSuper(req, res, next) {
  if (isSuper(req)) {
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'A permissão de super usuário é necessária para acessar este recurso.'
    })
  }
}

function authenticatedAdmin(req, res, next) {
  if (isAdmin(req)) {
    if (belongsToSite(req)) {
      next()
    } else {
      return res.status(403).json({
        status: 403,
        message: 'Você não tem permissão para acessar este recurso.'
      })
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: 'A permissão de administrador é necessária para acessar este recurso.'
    })
  }
}

function getSecret() {
  return process.env.SECRET || 'secret'
}

const auth = {
  authenticated: jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  super: [jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }), authenticatedSuper],
  admin: [jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }), authenticatedAdmin],
  optional: jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  }),
  applySite,
  isAdmin,
  isSuper
}

module.exports = auth
