<template>
  <b-container class="categories-component">
    <b-row>
      <b-col v-for="category in categories" :key="category._id" lg="3" sm="6">
        <n-link :to="'/' + category.slug + '/projetos'" tag="div" class="card">
          <b-img :src="category.picture ? category.picture.url : null" class="card-img-top" :alt="category.name" />
          <div class="card-body">
            <div class="card-text">
              <div class="icon">
                <b-img :src="category.icon.url" to="projetos" />
              </div>
              <h3 class="mt-4">{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>
          </div>
        </n-link>
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
