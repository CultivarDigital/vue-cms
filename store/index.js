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
      const data = await $axios.$get('/api/site').catch(e => {
        console.log('Não existe site com esse domínio: ', e.message) // eslint-disable-line
        console.error(e) // eslint-disable-line
      })
      if (data) {
        commit('SET_SITE', data)
      }
    }
  }
}
