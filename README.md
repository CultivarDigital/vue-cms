# Terrakrya CMS

A bunch of common features that allow the creation of sites in a simple and agile way. 
The objective is not to be an wordpress but acts more like a dynamic boilerplate to create dynamic websites without having to deal with the basics.

### Tecnologies used

Embracing the entire project we are using Nuxt.js with some @nuxtjs modules like: 
- auth for athentication
- axios for api requests
- pwa to allow the site to act as a Progressive Web App
- toast to handle errors and present it
 
To compose the client side we are using the Vue.js with some cool libraries like:
- BootstrapVue to compose the layout structure and form controls
- Leaflet to render maps
- vue-goodshare to show share buttons

The server site is composed inside on top of Node.js tecnologies like:
- Mongodb database
- Express to serve the node app
- Mongoose to structure the database
- Passport managing the authentication
- multer for upload
- sharp to thumbnail generation

### Basic features

- Authentication flow and user crud with authorization role
- Front site
- Admin panel
- Pages management
- Blog/Posts
- Events
- Contact form
- Multisites

### Developer instructions

```bash
# Clone this repo
git clone https://github.com/terrakrya/cms.git

# Go inside downloaded directory
cd cms/

# Install NPM dependecies
$ yarn install

# To run the developer version with hotreload in localhost:3000 run:
$ yarn dev

# In first time you need to generate the first user to access the admin panel:
$ yarn init

# The previous command printed you the generated user credentials. Use this info to access the admin panel at:
http://localhost:3000/admin

# para compilar e a versão de produção:
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
## Aways run "yarn lint" before commit

