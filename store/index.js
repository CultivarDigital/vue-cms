import axios from 'axios'

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
  }) {
    if (!state.site) {
      const resp = await axios.get('http://localhost:3000/api/site')
      commit('SET_SITE', resp.data)
    }
  }
}
