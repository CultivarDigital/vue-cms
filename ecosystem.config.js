module.exports = {
  apps: [
    {
      name: 'cms',
      exec_mode: 'fork',
      instances: 'max', // Or a number of instances
      script: 'node_modules/nuxt/bin/nuxt.js start',
      autorestart: true,
      env: {
        BASE_URL: 'https://cms.terrakrya.com',
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3010,
        MONGODB_URI: 'mongodb://localhost/cms',
        SECRET: 'ee9fc1362652d72faba35fb72c0dc26e'
      }
    }
  ]
}
