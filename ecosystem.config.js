module.exports = {
  apps: [
    {
      name: 'caminhos-da-semente',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'node_modules/nuxt/bin/nuxt.js start',
      autorestart: true,
      env: {
        BASE_URL: 'https://caminhos-da-semente.encenar.tk',
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3008,
        MONGODB_URI: 'mongodb://localhost/caminhos-da-semente',
        SECRET: 'ee9fc1362652d72faba35fb72c0dc26e'
      }
    }
  ]
}
