require('../api/database')

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Site = mongoose.model('Site')

const seed = async () => {
  let superUser = await User.findOne({ role: 'super' })
  if (superUser) {
    // eslint-disable-next-line no-console
    console.log('Já existe um super usuário cadastrado: ', superUser.email)
  } else {
    superUser = new User()
    const email = 'super@terrakrya.com'
    const password = Math.random().toString(36).substring(5)
    superUser.setPassword(password)
    superUser.name = 'Super usuário'
    superUser.email = email
    superUser.roles = ['super']
    await superUser.save()
    // eslint-disable-next-line no-console
    console.log('Super usuário cadastrado com sucesso: ', { email, password })
  }

  let site = await Site.findOne()
  if (site) {
    // eslint-disable-next-line no-console
    console.log('Já existe um site cadastrado: ', site)
  } else {
    site = new Site({
      slug: 'teste',
      name: 'Site de Teste',
      domain_name: 'localhost:3000'
    })
    await site.save()
    const user = new User()
    const email = 'admin@terrakrya.com'
    const password = Math.random().toString(36).substring(5)
    user.setPassword(password)
    user.site = site._id
    user.name = 'Administrador do site ' + site.name
    user.email = email
    user.roles = ['admin']
    await user.save()
    // eslint-disable-next-line no-console
    console.log('Site cadastrado com sucesso: ', { name: site.name, email, password })
  }

  process.exit()
}

seed()
