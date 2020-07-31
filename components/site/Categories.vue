<template>
  <b-container class="categories-component">
    <b-row>
      <b-col v-for="category in categories" :key="category._id" lg="3" sm="6">
        <b-card @click="open(category)" no-body :img-src="category.picture ? category.picture.url : null" :img-alt="category.name" img-top>
          <b-card-body>
            <b-card-text>
              <div class="icon">
                <b-img :src="category.icon.url" to="projetos" />
              </div>
              <h3 class="mt-4">{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    open (category) {
      this.$router.push('/' + category.slug + '/projetos')
    }
  }
}
</script>
<style lang="sass">
  .categories-component
    .row
      margin-left: -5px
      margin-right: -5px
      .col-lg-3, .col-sm-6
        padding-left: 5px
        padding-right: 5px
    .card
      border: none
      color: #2A114B
      text-align: center
      background-color: #edd5b5
      margin-bottom: 15px
      border-radius: 15px
      cursor: pointer
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-text
        height: 150px
        overflow-y: hidden
        font-size: 13px
        .icon
          background-color: #2A114B
          border-radius: 100%
          width: 80px
          height: 80px
          display: flex
          align-items: center
          justify-content: center
          position: absolute
          left: 0
          right: 0
          margin: auto
          margin-top: -60px
          img
            width: 65px
        h3
          font-size: 24px
          height: 60px
          color: #2A114B
        p
          font-family: 'Titillium Web', sans-serif
</style>
