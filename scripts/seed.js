require('../api/database')

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Site = mongoose.model('Site')

const seed = async () => {
  let site = await Site.findOne()

  if (site) {
    // eslint-disable-next-line no-console
    console.log('Já existe um site cadastrado: ', site)
  } else {
    site = new Site({
      slug: 'test',
      name: 'Test Site',
      domain_name: 'localhost:3000'
    })
    await site.save()
    // eslint-disable-next-line no-console
    console.log('Site cadastrado com sucesso: ', site)
  }

  let user = await User.findOne()

  if (user) {
    // eslint-disable-next-line no-console
    console.log('Já existe um usuário cadastrado: ', user.email)
  } else {
    user = new User()

    const email = 'admin@terrakrya.com'
    const password = Math.random().toString(36).substring(7)

    user.setPassword(password)

    user.site = site._id
    user.name = 'Super usuário'
    user.email = email
    user.roles = ['super']

    await user.save()
    // eslint-disable-next-line no-console
    console.log('Super usuário cadastrado com sucesso: ', { email, password })
  }
  process.exit()
}

seed()
