export default {
  defaultPicture(pictures) {
    let picture = {}
    if (pictures) {
      picture = pictures.find(picture => picture.default)
    }
    return picture
  }
}
