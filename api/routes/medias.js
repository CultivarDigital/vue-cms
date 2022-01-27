const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// const axios = require('axios')
// const wget = require('node-wget')
const auth = require('../config/auth')
// const mendeley = require('../../data/mendeley.json')
// const mendeleyFiles = require('../../data/mendeley-files.json')
// const docTypes = require('../../data/document-types.json')
const Media = mongoose.model('Media')
// const Attachment = mongoose.model('Attachment')

// const fieldOptions = (docs, column) => {
//   const values = {}
//   docs.forEach(d => {
//     values[d[column]] = true
//   })
//   return Object.keys(values).sort((a, b) => a.localeCompare(b))
// }

// const fieldArrayOptions = (docs, column) => {
//   const values = {}
//   docs.forEach(d => {
//     if (d[column]) {
//       d[column].forEach(v => {
//         values[v] = true
//       })
//     }
//   })
//   return Object.keys(values).sort((a, b) => a.localeCompare(b))
// }

// router.get('/import', async (req, res) => {
//   const medias = {
//     categories: [],
//     tags: [],
//     langs: [],
//     languages: [],
//     fields: [],
//     types: [],
//     list: []
//   }
//   const fields = {}

//   for (const d of mendeley) {
//     const m = new Media()
//     m.aditional_infos = []
//     m.title = d.title
//     m.type = docTypes[d.type]
//     m.authors = d.authors
//     m.description = d.abstract

//     if (d.editors && d.editors.length) {
//       if (d.type === 'thesis') {
//         m.aditional_infos.push({ label: 'Orientadores', value: d.editors.map(editor => Object.values(editor).join(' ').replace('Orientador: ', '')).join(', ') })
//       } else {
//         m.organizers = d.editors
//       }
//     }

//     if (d.identifiers && d.identifiers.doi) {
//       m.doi = d.identifiers.doi
//     }

//     m.institution = d.institution
//     m.number = d.institution

//     m.tags = d.keywords
//     m.categories = d.tags

//     if (d.language) {
//       m.languages = d.language
//         .replace('/', '; ')
//         .split('; ').map(l => {
//           if (l === 'ing' || l === 'Ing' || l === 'inglês') {
//             return 'Inglês'
//           }
//           if (l === 'por' || l === 'Por' || l === 'POR' || l === 'português') {
//             return 'Português'
//           }
//           if (l === 'esp') {
//             return 'Espanhol'
//           }
//           return l
//         })
//     }

//     if (m.categories) {
//       m.categories = m.categories.map(category => {
//         if (category === 'economia') {
//           return 'Economia'
//         }
//         if (category === 'Nutriçao e saude' || category === 'Nutriçao e saúde' || category === 'Nutrição e Saúde') {
//           return 'Nutrição e saúde'
//         }
//         if (category === 'Organização Comunitária') {
//           return 'Organização comunitária'
//         }
//         if (category === 'questões ambientais' || category === 'Questões Ambientais') {
//           return 'Questões ambientais'
//         }
//         if (category === 'Sanitario') {
//           return 'Sanitário'
//         }
//         if (category === 'Saúde e Nutrição') {
//           return 'Saúde e nutrição'
//         }
//         if (category === 'tecnologia e inovação' || category === 'Tecnologia e Inovação') {
//           return 'Tecnologia e inovação'
//         }

//         return category
//       })
//     }
//     m.notes = d.notes
//     m.pages = d.pages
//     m.patent_legal_status = d.patent_legal_status
//     m.publishing_house = d.publisher

//     if (d.series) {
//       m.aditional_infos.push({ label: 'Serie', value: d.series })
//     }

//     m.source = d.source
//     m.volume = d.volume
//     if (d.year) {
//       m.publishing_date = new Date(d.year, 0, 1)
//       m.publishing_date_format = 'YYYY'
//     }

//     Object.keys(d).forEach(k => {
//       fields[k] = true
//     })
//     m.documents = []
//     if (d.websites) {
//       for (const website of d.websites) {
//         const attachment = new Attachment({
//           type: 'documents',
//           url: website,
//           title: website
//         })
//         await attachment.save()
//         m.docs.push(attachment._id)
//       }
//     }
//     const files = mendeleyFiles.filter(file => file.document_id === d.id)
//     for (const file of files) {
//       const resp = await axios.request({
//         url: 'https://www.mendeley.com/reference-manager/api/file/' + file.id + '/',
//         method: 'get',
//         headers: {
//           Cookie: 'msso_check=4:081e83cc-57cf-469a-bc62-5d97118b4982; accessToken=MSwxNjQxNjkyOTc1OTkxLDYzODUxNjY0MSw2NzMyLGFsbCwsLGE2NmNhM2JkODI3N2Q0NDkxMTBiYjQ1NWYwZDkxYjAzZmFhZGd4cnFhLDAwZDQwMzQ3LWIyZjMtM2M0YS05NmY1LTg2MTBlMTc2Yzk5OCx2ZzFJMTd0SGxETjBreklyclRzMW1HZzZVRVU; msso=4:081e83cc-57cf-469a-bc62-5d97118b4982; aa_usr={"accessType":"ae:REG:U_P:GUEST:","accountId":"ae:293744","accountName":"ae:Mendeley Guests","userId":"ae:95453126"}; node_session=eyJpZCI6ImE3YzdjYjU4LTU0NjktNDc2Ni1hNWRiLTkwNDg4MjY4Y2Y0YSIsInN0YXRlIjoiYThiMGU2Yjg3NDQyNjFlMzBhOTYzZGUwNzNkNGEyNWYiLCJyZWZlcnJlclVybCI6Imh0dHBzOi8vd3d3Lm1lbmRlbGV5LmNvbS9yZWZlcmVuY2UtbWFuYWdlci9saWJyYXJ5L2FsbC1yZWZlcmVuY2VzLyIsImlzU29mdFNpZ25JbiI6ZmFsc2UsInByb21wdCI6Im5vbmUiLCJhbmFseXRpY3NJbmZvIjpudWxsLCJpbmR2SWRlbnRpdHkiOiJSRUciLCJpZFRva2VuSWF0IjoiMjVhODNjMTRkMGY0OTg2YzQyYzAzYjc5YmQiLCJpbmNsdWRlUHJvbXB0ZWRTdGF0dXMiOm51bGx9; node_session.sig=RvxG0XYk1ebGN6cQ_jZtCwWjmWw; OptanonAlertBoxClosed=2022-01-09T01:12:36.261Z; AMCVS_4D6368F454EC41940A4C98A6@AdobeOrg=1; at_check=true; AMCV_4D6368F454EC41940A4C98A6@AdobeOrg=-2121179033|MCMID|33596307266216881461098006702080173584|MCAAMLH-1642295909|4|MCAAMB-1642295909|RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y|MCOPTOUT-1641698309s|NONE|MCAID|NONE|MCCIDH|-778269422|vVersion|5.3.0|MCIDTS|19002; __cf_bm=rhPEI5eQfNKrlgFgrj9.7eQfh8RIiMC4hYpTUt16g7Q-1641691631-0-AVgCQmrnQW3U+4YIhPVPOdlNX+ja8gneMHMW0DcoIppXowp3l2s0Hj/Lc6fDcfpayUv4IY/ymvz6mkjZZfRn5Sc=; mbox=session#b38fe29baa8744098273bd3f9c0570f9#1641694227|PC#b38fe29baa8744098273bd3f9c0570f9.34_0#1704937167; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Jan+08+2022+22:39:35+GMT-0300+(Brasilia+Standard+Time)&version=6.28.0&isIABGlobal=false&hosts=&consentId=f4df9a01-1b02-45ff-9b82-25b1c1853d7f&interactionCount=1&landingPath=NotLandingPage&groups=1:1,3:1,2:1,4:1&geolocation=BR;GO&AwaitingReconsent=false; els-aa-debugmode=true; s_pers= v8=1641692377576|1736300377576; v8_s=First%20Visit|1641694177576; c19=md%3Arefman%3Alibrary|1641694177589; v68=1641692377328|1641694177603;; s_sess= s_cpc=0; s_sq=; s_cc=true; c21=no%20criteria%20set; e13=no%20criteria%20set%3A1; c13=added-desc; e41=1; s_ppvl=md%253Arefman%253Alibrary%2C100%2C100%2C571%2C538%2C571%2C1366%2C768%2C1%2CL; s_ppv=md%253Arefman%253Alibrary%253Areader%253Apanel%253Ainfo%2C100%2C100%2C571%2C538%2C571%2C1366%2C768%2C1%2CL;'
//         }
//       })
//       if (resp && resp.data && resp.data.url) {
//         wget({
//           url: resp.data.url,
//           dest: 'api/uploads/documents/' + file.id + '/' + file.file_name, // destination path or path with filenname, default is ./
//           timeout: 2000000 // duration to wait for request fulfillment in milliseconds, default is 2 seconds
//         },
//         function (error, response, body) {
//           if (error) {
//             console.log('--- error:')
//             console.log(error) // error encountered
//           } else {
//             console.log('Baixado: ' + file.file_name)
//           }
//         }
//         )
//       }
//       const attachment = new Attachment({
//         type: 'documents',
//         url: 'api/uploads/documents/' + file.id + '/' + file.file_name,
//         title: file.file_name
//       })
//       await attachment.save()
//       m.docs.push(attachment._id)
//     }
//     await m.save()
//     medias.list.push(m)
//   }

//   medias.categories = fieldArrayOptions(medias.list, 'categories')
//   medias.tags = fieldArrayOptions(mendeley, 'tags')
//   medias.langs = fieldOptions(mendeley, 'language')
//   medias.languages = fieldArrayOptions(medias.list, 'languages')

//   medias.fields = Object.keys(fields).sort((a, b) => a.localeCompare(b))
//   res.json(medias)
// })

router.get('/', (req, res) => {
  const query = {}

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: 'i' }
  }
  if (req.query.category) {
    query.categories = req.query.category
  }
  if (req.query.tag) {
    query.tags = req.query.tag
  }

  Media.find(query).populate(req.query.populate).sort({ createdAt: -1 }).exec((err, medias) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(medias)
    }
  })
})

router.get('/tags', (req, res) => {
  const query = { }
  Media.find(query, 'tags').exec((err, medias) => {
    if (err) {
      res.status(422).send(err)
    } else {
      const tags = {}
      medias.forEach(media => {
        if (media && media.tags) {
          media.tags.forEach(tag => {
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

router.get('/filters', (req, res) => {
  const query = { }
  Media.find(query, 'tags categories').exec((err, medias) => {
    if (err) {
      res.status(422).send(err)
    } else {
      const tags = {}
      const categories = {}
      medias.forEach(media => {
        if (media && media.tags) {
          media.tags.forEach(tag => {
            tags[tag] = true
          })
        }
        if (media && media.categories) {
          media.categories.forEach(category => {
            categories[category] = true
          })
        }
      })

      res.json({
        tags: Object.keys(tags).sort((a, b) => {
          return a.localeCompare(b)
        }),
        categories: Object.keys(categories).sort((a, b) => {
          return a.localeCompare(b)
        })
      })
    }
  })
})

router.get('/:id', (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(media)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newMedia = new Media(req.body)
  if (!newMedia.publishing_date) {
    newMedia.publishing_date = new Date()
  }
  newMedia.save((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  Media.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(media)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Media.findOne({
    _id: req.params.id
  }).exec((err, media) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      media.remove()
      res.send(media)
    }
  })
})

module.exports = router
