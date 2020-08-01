
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  // server: {
  //   port: process.env.PORT || 3000, // default: 3000
  //   host: process.env.HOST || 'localhost' // default: localhost
  // },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  serverMiddleware: [
    '~/api/index.js'
  ],
  head: {
    title: "Terrakrya CMS" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['@/assets/css/main.scss'],
  pageTransition: 'page',
  // styleResources: {
  //   sass: [
  //     // '@/assets/css/main.sass'
  //   ]
  // },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~plugins/filters.js',
    '~plugins/url.js',
    '~plugins/bootstrap-vue.js',
    { src: '~plugins/quill.js', ssr: false },
    '~/plugins/lightGallery.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
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
    'vue-scrollto/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: '', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: ''
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: ''
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
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
      'Titillium Web': true,
      'Amatic SC': {
        wght: [400, 700]
      }
    }
  },
  build: {
  },
  proxy: {
    pathRewrite: { '^/api/': '/' }
  },
  env: { }
}
