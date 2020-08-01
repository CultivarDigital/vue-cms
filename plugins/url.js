export default ({ $axios, req }) => {
  if ($axios && req && process.env.NODE_ENV === 'production') {
    console.log('XXXX updating domain to: XXXX')
    console.log('https://' + req.headers.host)
    $axios.setBaseURL('https://' + req.headers.host)
    console.log($axios.defaults.baseURL)
  }
}
