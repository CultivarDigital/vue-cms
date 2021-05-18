const jwt = require('express-jwt')

function getTokenFromHeader(req) {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

function isSuper(req) {
  if (req.user && req.user.roles) {
    return req.user.roles.includes('super')
  }
  return false
}

function isAdmin(req) {
  if (req.user && req.user.roles) {
    return req.user.roles.includes('admin') || req.user.roles.includes('super')
  }
  return false
}

function isClientOrAbove(req) {
  if (req.user && req.user.roles) {
    return req.user.roles.includes('client') || req.user.roles.includes('admin') || req.user.roles.includes('super')
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
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'A permissão de administrador é necessária para acessar este recurso.'
    })
  }
}

function authenticatedClient(req, res, next) {
  if (isClientOrAbove(req)) {
    next()
  } else {
    return res.status(403).json({
      status: 403,
      message: 'A permissão de cliente é necessária para acessar este recurso.'
    })
  }
}

function getSecret() {
  return process.env.SECRET || 'secret'
}

const authenticatedJWT = () => {
  return jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken: getTokenFromHeader
  })
}
const auth = {
  authenticated: authenticatedJWT(),
  super: [authenticatedJWT(), authenticatedSuper],
  admin: [authenticatedJWT(), authenticatedAdmin],
  client: [authenticatedJWT(), authenticatedClient],
  optional: jwt({
    secret: getSecret(),
    algorithms: ['HS256'],
    userProperty: 'user',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  }),
  isClientOrAbove,
  isAdmin,
  isSuper
}

module.exports = auth
