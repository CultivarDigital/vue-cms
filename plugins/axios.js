import https from 'https'

export default function ({ $axios, app }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
}
