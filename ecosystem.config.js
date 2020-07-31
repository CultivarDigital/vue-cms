module.exports = {
  apps: [
    {
      name: 'terrakrya-cms',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        HOST: 'http://florestaprotegidanovo.encenar.tk',
        PORT: 80,
        MONGODB_URI: 'mongodb://localhost/terrakrya-cms',
        SECRET: 'ee9fc1362652d72faba35fb72c0dc26e'
      }
    }
  ]
}
