export default {
  methods: {
    toForm (form, data) {
      Object.keys(form).map((key) => {
        if (data && data[key]) {
          if (typeof data[key] === 'string' && data[key].includes('T00:00:00.000Z') && key !== 'date_time') {
            form[key] = data[key].replace(/T00:00:00.000Z/g, '')
          } else {
            form[key] = data[key]
          }
        }
      })
      return form
    }
  }
}
