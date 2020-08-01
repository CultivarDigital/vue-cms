export default ({ $axios, req }) => {
  if ($axios && req) {
    console.log('http://' + req.headers.host)
    $axios.setBaseURL('http://' + req.headers.host)
    console.log($axios.defaults.baseURL)
  }
}
