const jwt = require('express-jwt')

const secret = process.env.SECRET || process.env.npm_package_name

function getTokenFromHeader(req) {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

function isAdmin(req) {
  if (req.user && req.user.role) {
    return req.user.role === 'admin'
  }
  return false
}

function isClientOrAbove(req) {
  if (req.user && req.user.role) {
    return req.user.role === 'client' || req.user.role === 'admin'
  }
  return false
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

const authenticatedJWT = () => {
  return jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken: getTokenFromHeader
  })
}
const auth = {
  authenticated: authenticatedJWT(),
  admin: [authenticatedJWT(), authenticatedAdmin],
  client: [authenticatedJWT(), authenticatedClient],
  optional: jwt({
    secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  }),
  isClientOrAbove,
  isAdmin
}

module.exports = auth
