module.exports = {
  apps: [
    {
      name: 'redes-agroecologicas',
      exec_mode: 'fork',
      instances: 'max', // Or a number of instances
      script: 'node_modules/nuxt/bin/nuxt.js start',
      autorestart: true,
      env: {
        BASE_URL: 'https://redes-agroecologicas.terrakrya.com',
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3009,
        MONGODB_URI: 'mongodb://localhost/redes-agroecologicas',
        SECRET: 'ee9fc1362652d72faba35fb72c0dc26e'
      }
    }
  ]
}
