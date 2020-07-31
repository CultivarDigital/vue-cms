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
      console.log('ASDFASDFASDFASDFASDF ASDF ASDF ASDF ASD FASDF')
      console.log(process.env.NODE_ENV)
      if (process.env.NODE_ENV === 'production') {
        console.log('http://' + req.headers.host)
        $axios.setBaseURL('http://' + req.headers.host)
      }
      console.log($axios.defaults.baseURL)
      const data = await $axios.$get('/api/site').catch(e => {
        console.error(e)
        console.log('Não existe site com esse domínio')
      })
      if (data) {
        commit('SET_SITE', data)
      }
    }
  }
}
