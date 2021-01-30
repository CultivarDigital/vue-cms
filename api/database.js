require('./models/Site')
require('./models/User')
require('./models/Category')
require('./models/Tag')
require('./models/Project')
require('./models/Post')
require('./models/Event')
require('./models/Page')
require('./models/Contact')
require('./models/Media')
require('./models/Menu')
require('./config/passport')

const mongoose = require('mongoose')
const isProduction = process.env.NODE_ENV === 'production'

mongoose.set('useFindAndModify', false)
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  // mongoose.set('debug', true)
  mongoose.connect('mongodb://localhost/cms', { useNewUrlParser: true, useUnifiedTopology: true })
}
