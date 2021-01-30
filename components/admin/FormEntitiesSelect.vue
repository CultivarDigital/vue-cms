<template>
  <div>
    <v-select v-model="entity" :options="list" label="title" placeholder="Busque pelo nome e clique para adicionar à lista">
      <template v-slot:option="option">
        <div class="select-item">
          <img v-if="option.picture" :src="option.picture">
          <div class="desc">
            <strong>{{ option.title }}</strong>
            <br>
            <small>{{ option.description }}</small>
          </div>
          <div class="clearfix" />
        </div>
      </template>
      <template v-slot:selected-option="option">
        <div class="select-item">
          <img v-if="option.picture" :src="option.picture">
          <div class="desc">
            <strong>{{ option.title }}</strong>
            <br>
            <small>{{ option.description }}</small>
          </div>
          <div class="clearfix" />
        </div>
      </template>
    </v-select>
    <div v-if="preview && preview.length > 0" class="entity-select-preview">
      <small> Selecionados: </small>
      <div class="list-group">
        <div v-for="(item_preview, index) in preview" :key="index" class="list-group-item">
          <div>
            <img v-if="item_preview && item_preview.picture" :src="item_preview.picture">
            <span v-if="item_preview">{{ item_preview.title }}</span>
            <b-button v-if="item_preview" class="float-right" size="sm" variant="danger" @click="removeItem(item_preview.id)">
              <b-icon-trash />
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: [Object],
      default: null
    },
    type: {
      type: String,
      default: null
    },
    form: {
      type: Object,
      default: null
    },
    field: {
      type: String,
      default: null
    }
  },
  inject: ['$validator'],
  data() {
    return {
      list: [],
      entity: null
    }
  },
  computed: {
    preview() {
      if (this.form && this.form[this.field] && this.list) {
        return this.form[this.field].map(selected => {
          return this.getItem(selected)
        }).filter(preview => preview)
      }
      return []
    }
  },
  watch: {
    entity() {
      this.addItem()
    }
  },
  async created() {
    if (this.items) {
      this.list = this.items.sort(function(a, b) {
        return a.title.localeCompare(b.title)
      })
    } else {
      switch (this.type) {
        case 'categories':
          this.list = (await this.$axios.$get('/api/categories')).map(category => ({
            id: category._id,
            title: category.name
          }))
          break
      }
      switch (this.type) {
        case 'tags':
          this.list = (await this.$axios.$get('/api/tags')).map(tag => ({
            id: tag._id,
            title: tag.name
          }))
          break
      }
    }
  },
  methods: {
    addItem() {
      if (this.entity && !this.form[this.field].find(item => (item === this.entity.id))) {
        this.form[this.field].push(this.entity.id)
      }
      this.entity = null
    },
    removeItem(id) {
      this.form[this.field] = this.form[this.field].filter(item => (item !== id))
    },
    getItem(id) {
      return this.list.find(i => {
        return i.id === id
      })
    }
  }
}
</script>
