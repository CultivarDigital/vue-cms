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
      var baseURL = 'http://localhost:3000'
      if (process.env.NODE_ENV === 'production') {
        baseURL = 'http://' + req.headers.host
      }
      const data = await $axios.$get('/api/site', { baseURL }).catch(e => {
        console.log(e);
        console.log('Não existe site com esse domínio')
      })
      if (data) {
        commit('SET_SITE', data)
      }
    }
  }
}
