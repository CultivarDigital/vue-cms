require('../api/database')
const mongoose = require('mongoose')
const Attachment = mongoose.model('Attachment')

const createAttachment = async (type, data) => {
  const attachment = new Attachment(Object.assign({ type }, data))
  if (attachment.title && attachment.title.includes('.')) {
    attachment.title = attachment.title.replace(/\.[^/.]+$/, '')
  }
  await attachment.save()
  return attachment._id
}
const generateAttachment = async (type, data) => {
  if (data) {
    if (Array.isArray(data)) {
      const items = []
      for (const item of data) {
        if (item) {
          const id = await createAttachment(type, item)
          items.push(id)
        }
        return items
      }
    } else if (data.url) {
      return await createAttachment(type, data)
    }
  }
  return null
}

const fixAttachment = async (params) => {
  const Model = mongoose.model(params.model)
  const items = await Model.find()
  for (const item of items) {
    item[params.to] = await generateAttachment(params.type, item[params.from])
    await item.save()
  }
}
const fixAttachments = async () => {
  await fixAttachment({
    type: 'images',
    model: 'Event',
    from: 'picture',
    to: 'image'
  })
  await fixAttachment({
    type: 'images',
    model: 'Media',
    from: 'picture',
    to: 'image'
  })
  await fixAttachment({
    type: 'images',
    model: 'Post',
    from: 'picture',
    to: 'image'
  })
  await fixAttachment({
    type: 'images',
    model: 'User',
    from: 'picture',
    to: 'image'
  })
  await fixAttachment({
    type: 'images',
    model: 'Page',
    from: 'pictures',
    to: 'images'
  })
  await fixAttachment({
    type: 'images',
    model: 'Product',
    from: 'pictures',
    to: 'images'
  })
  await fixAttachment({
    type: 'images',
    model: 'Settings',
    from: 'logo',
    to: 'site_logo'
  })
  await fixAttachment({
    type: 'images',
    model: 'Settings',
    from: 'favicon',
    to: 'site_favicon'
  })
  await fixAttachment({
    type: 'images',
    model: 'Settings',
    from: 'banners',
    to: 'site_banners'
  })
  await fixAttachment({
    type: 'documents',
    model: 'Event',
    from: 'documents',
    to: 'docs'
  })
  await fixAttachment({
    type: 'documents',
    model: 'Media',
    from: 'documents',
    to: 'docs'
  })
  await fixAttachment({
    type: 'documents',
    model: 'Page',
    from: 'documents',
    to: 'docs'
  })
  await fixAttachment({
    type: 'documents',
    model: 'Post',
    from: 'documents',
    to: 'docs'
  })
  await fixAttachment({
    type: 'documents',
    model: 'Product',
    from: 'documents',
    to: 'docs'
  })
}

const fix = async () => {
  await fixAttachments()
  process.exit()
}

fix()
