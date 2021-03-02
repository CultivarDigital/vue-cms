export default {
  mode: 'universal',
  target: 'server',
  serverMiddleware: [
    '~/api/index.js'
  ],
  head: {
    title: 'Rede de Sementes do Xingu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['@/assets/css/custom.sass'],
  pageTransition: 'page',
  plugins: [
    '~plugins/axios.js',
    '~plugins/vue2-filters.js',
    '~plugins/filters.js',
    '~plugins/url.js',
    '~plugins/bootstrap-vue.js',
    { src: '~plugins/quill.js', ssr: false },
    { src: '~/plugins/v-calendar', ssr: false },
    { src: '~/plugins/v-money.js', ssr: false },
    { src: '~/plugins/vue-the-mask.js', ssr: false },
    { src: '~/plugins/vue-goodshare.js', ssr: false },
    { src: '~/plugins/datepicker', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome'
  ],
  modules: [
    // Doc: https://bootstrap-vue.js.org
    ['bootstrap-vue/nuxt'],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    ['nuxt-validate', {
      lang: 'pt_BR'
    }],
    '@tui-nuxt/editor',
    [
      'nuxt-i18n',
      {
        locales: ['pt-BR'],
        defaultLocale: 'pt-BR',
        vueI18n: {
          fallbackLocale: 'pt-BR'
        }
      }
    ],
    'nuxt-vue-select',
    'vue-scrollto/nuxt',
    'nuxt-leaflet'
  ],
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000' // Used as fallback if no runtime config is provided
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/profile', method: 'get', propertyName: false }
        },
        tokenType: 'Token'
      }
    },
    scopeKey: 'roles'
  },
  toast: {
    duration: 7000,
    keepOnHover: true,
    theme: 'bubble'
  },
  tui: {
    editor: {}
  },
  googleFonts: {
    families: {
      Montserrat: {
        wght: ['300']
      },
      Arvo: {
        wght: ['400', '700']
      }
    }
  },
  moment: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    timezone: true,
    defaultTimezone: 'utc'
  },
  fontawesome: {
    icons: {
      solid: ['faHome', 'faMapMarker'],
      brands: ['faFacebookSquare', 'faTwitterSquare']
    }
  },
  proxy: {
    pathRewrite: {
      '^/api/': '/'
    }
  },
  env: { }
}
