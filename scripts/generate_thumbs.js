/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const generateThumbs = () => {
  const dir = path.join(__dirname, '../api/uploads/images/')
  console.log(dir)
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      files.forEach((file) => {
        if (file !== 'thumbs' && file !== 'averages') {
          console.log(file)
          const fileUrl = dir + file
          const thumbUrl = dir + 'thumbs/' + file
          const averageUrl = dir + 'averages/' + file
          console.log(fileUrl)
          console.log(thumbUrl)
          sharp(fileUrl)
            .resize({
              width: 400,
              height: 400,
              withoutEnlargement: true,
              fit: sharp.fit.cover
            })
            .toFile(thumbUrl, function (err) {
              if (!err) {
                console.log('Generated: ' + thumbUrl)
                sharp(fileUrl)
                  .resize({
                    width: 1920,
                    withoutEnlargement: true
                  })
                  .toFile(averageUrl, function (err) {
                    if (!err) {
                      console.log('Generated: ' + averageUrl)
                    }
                  })
              }
            })
        }
      })
    }
  })
}
generateThumbs()
