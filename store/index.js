export const state = () => ({
  site: null
})

export const mutations = {
  SET_SITE(state, site) {
    state.site = site
  }
}

export const actions = {
  async nuxtServerInit({
    commit,
    state
  }, { $axios, req }) {
    if (!state.site) {
      console.log('req.headers.host')
      if (process.env.NODE_ENV === 'production') {
        $axios.defaults.baseURL = 'http://' + req.headers.host
      }
      console.log(process.env.NODE_ENV)
      console.log(req.headers.host)
      console.log($axios.defaults.baseURL)
      const data = await $axios.$get('/api/site').catch(e => {
        console.log('Não existe site com esse domínio')
      })
      if (data) {
        commit('SET_SITE', data)
      }
    }
  }
}
