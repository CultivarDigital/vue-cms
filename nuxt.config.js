export default {
  mode: 'universal',
  target: 'server',
  serverMiddleware: [
    '~/api/index.js'
  ],
  head: {
    title: 'Caminhos da Semente' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['@/assets/css/main.scss'],
  pageTransition: 'page',
  plugins: [
    '~plugins/filters.js',
    '~plugins/url.js',
    '~plugins/bootstrap-vue.js',
    { src: '~plugins/quill.js', ssr: false },
    { src: '~/plugins/datepicker', ssr: false },
    { src: '~/plugins/v-money.js', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts'
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
    baseURL: 'https://caminhos-da-semente.encenar.tk' // Used as fallback if no runtime config is provided
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
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
  build: {
  },
  proxy: {
    pathRewrite: {
      '^/api/': '/'
    }
  },
  env: { }
}
