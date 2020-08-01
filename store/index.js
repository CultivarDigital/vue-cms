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
        console.error(e)
        console.log('Não existe site com esse domínio')
      })
      if (data) {
        commit('SET_SITE', data)
      }
    }
  }
}
