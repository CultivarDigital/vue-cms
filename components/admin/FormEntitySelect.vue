<template>
  <div>
    <v-select v-model="entity" v-validate="validate" :options="list" label="title" :name="field" :placeholder="placeholder || 'Busque pelo nome e clique para selecionar'">
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
    <span v-for="(err, index) in veeErrors" :key="index">
      <span v-if="err.field === field" class="text-danger">{{ err.msg }}</span>
    </span>
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
    },
    input: {
      type: String,
      default: null
    },
    validate: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  inject: ['$validator'],
  data() {
    return {
      list: [],
      entity: []
    }
  },
  watch: {
    items: (newVal) => {
      this.list = newVal
    },
    entity() {
      this.addItem()
      this.callback(this.entity)
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
        case 'menus':
          this.list = (await this.$axios.$get('/api/menus')).map(menu => ({
            id: menu._id,
            title: menu.name
          }))
          break
      }
    }
    if (this.form[this.field] && this.form[this.field].length) {
      this.entity = this.list.find(item => {
        return item.id === this.form[this.field]
      })
    }
  },
  methods: {
    addItem() {
      if (this.entity) {
        this.form[this.field] = this.entity.id
      } else {
        this.form[this.field] = null
      }
    },
    callback(entity) {
      if (this.input) {
        this.input(entity)
      }
    }
  }
}
</script>
