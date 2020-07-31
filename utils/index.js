const wget = require('node-wget')
const sharp = require('sharp')

module.exports = {
  stripHtml: (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "")
  },
  getAttrFromString: (str, node, attr) => {
      var regex = new RegExp('<' + node + ' .*?' + attr + '="(.*?)"', "gi"), result, res = []
      while ((result = regex.exec(str))) {
          res.push(result[1])
      }
      return res
  },
  defaultPicture: (pictures) => {
    let picture = {}
    if (pictures) {
      picture = pictures.find(picture => picture.default)
    }
    return picture
  },
  downloadPicture: (remoteUrl, slug) => {
    var filename = decodeURI(remoteUrl).split("/").pop()
    filename = filename.split(' ').join('')
    var imagesPath = 'api/uploads/' + slug + '/images/'
    var thumb = imagesPath + 'thumbs/' + filename
    var average = imagesPath + 'averages/' + filename
    console.log('filename')
    console.log(filename)
    wget({
      url: remoteUrl,
      dest: imagesPath + filename
    }, function(error, response, body) {
      if (error) {
        console.log(error)
      } else {
        sharp(imagesPath + filename, { failOnError: false })
          .resize(400)
          .toFile(thumb, function(err) {
            if (err) {
              console.log("Thumb error: ", err)
            }
            sharp(imagesPath + filename, { failOnError: false })
              .resize(1024)
              .toFile(average, function(err) {
                if (err) {
                  console.log("File upload error: ", err)
                }
                const img = {
                  url: '/' + imagesPath + filename,
                  average: '/' + average,
                  thumb: '/' + thumb
                }
                console.log("Picture downloaded:")
                console.log(img)
                return img
              })
          })
      }
    })

  }
}
