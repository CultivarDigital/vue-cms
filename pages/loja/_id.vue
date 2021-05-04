<template>
  <b-container class="shop py-4">
    <div v-if="product">
      <b-row>
        <b-col>
          <router-link to="/loja" class="text-secondary">
            <strong>Loja</strong>
          </router-link>
          <b-icon-chevron-right />
          {{ product.name }}
        </b-col>
        <b-col>
          <div class="text-md-right">
            <CartButton />
          </div>
        </b-col>
      </b-row>
      <br>
      <div class="row">
        <div class="col-sm-5">
          <b-carousel id="carousel-fade" v-model="slide" style="text-shadow: 0px 0px 2px #000" fade indicators img-width="1024" img-height="480">
            <b-carousel-slide v-for="(picture, index) in product.pictures" :key="index" :img-src="picture.url" />
          </b-carousel>
          <div v-if="product.pictures.length > 1" class="product_thumbs row">
            <div v-for="(picture, index) in product.pictures" :key="index" class="col-sm-3">
              <a @click="setSlide(index)"><img class="thumbnail" :src="picture.url" :class="{active: (slide === index)}"></a>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-sm-7">
          <h2 class="title"> {{ product.name }} </h2>
          <tags :tags="product.tags" @click="(tag) => $router.push('/loja?tag=' + tag)" />
          <br>
          <AddToCart :product="product" />
          <br>
          <p v-if="product.description" class="pre-line">{{ product.description }}</p>
          <div v-if="product.content" v-html="product.content" />
        </div>
        <div v-if="related_products.length" class="div mt-4 text-secondary">
          <div class="card-header">
            <strong>Produtos relacionados</strong>
          </div>
          <div class="card-body">
            <b-card-group columns>
              <Product v-for="related_product in related_products" :key="related_product._id" :product="related_product" />
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <b-spinner />
    </div>
  </b-container>
</template>
<script>
import mixinPage from '@/mixins/page'

export default {
  mixins: [mixinPage],
  data() {
    return {
      product: null,
      slide: 0,
      qtd: 1,
      related_products: [],
      page_title: 'Loja'
    }
  },
  computed: {
    alreadyOnCart() {
      let qtd = 0
      const cart = this.$store.state.cart
      if (cart && cart.length) {
        qtd = cart.filter(i => i.product._id === this.product._id).reduce((a, b) => {
          return a + b.qtd
        }, 0)
      }
      return qtd
    },
    availableQtd() {
      let qtd = 0
      if (this.product) {
        qtd = this.product.qtd - this.alreadyOnCart
      }
      return qtd
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.get()
      }
    }
  },

  created() {
    this.get()
    this.getRelated()
  },
  methods: {
    async get() {
      this.product = await this.$axios
        .$get('/api/shop/product/' + this.$route.params.id)
        .catch(this.showError)
      if (this.product) {
        this.page_title = this.product.name
      }
    },
    async getRelated() {
      this.related_products = await this.$axios.$get('/api/shop/related/' + this.$route.params.id).catch(this.showError)
    },
    setSlide(slide) {
      this.slide = slide
    }
  }
}
</script>
