export const state = () => ({
  site: null,
  cart: []
})

export const mutations = {
  SET_SITE(state, site) {
    state.site = site
  },
  addToCart(state, cartItem) {
    const i = state.cart.findIndex(
      (item) => item.product._id === cartItem.product._id
    )
    if (i >= 0) {
      state.cart[i].qtd += cartItem.qtd
    } else {
      state.cart.push(cartItem)
    }
  },
  removeFromCart(state, index) {
    delete state.cart[index]
    state.cart.splice(index, 1)
  },
  clearCart(state) {
    state.cart = []
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
