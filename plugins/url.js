export default ({ $axios, req }) => {
  if (process.env.NODE_ENV === 'production') {
    $axios.setBaseURL('http://' + req.headers.host)
  }
  console.log($axios.defaults.baseURL)
}
