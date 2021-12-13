<template>
  <div>
    <Banners v-if="page" :items="page.images" />
    <Breadcrumb
      v-if="page && breadcrumb"
      :active="page.title"
      :description="page.description"
    />
    <div v-if="page" class="page">
      <b-container>
        <div :class="{'edit-page': editMode}">
          <template v-for="(component, index) in components">
            <DynamicComponent v-if="component.type" :id="'tooltip-target-' + index" :key="index" class="dynamic-component" :class="{'active-component': editComponent === index}" :type="component.type" :attrs="component.attrs" @click="editComponent = index" v-html="component.content" />
            <b-tooltip v-if="editMode" :key="'tooltip-' + index" :target="'tooltip-target-' + index" triggers="hover">
              Clique para editar
            </b-tooltip>
          </template>
        </div>
        <div v-if="editMode">
          <div class="text-center">
            <b-btn @click="addComponent">Adicionar elemento</b-btn>
          </div>
          <DynamicComponentForm v-if="editComponent !== null" v-model="components[editComponent]" @close="closeComponent" @save="save" @remove="removeComponent" />
        </div>
        <div class="title mt-5">
          <h1 v-if="page.title" class="title">{{ page.title }}</h1>
          <hr>
        </div>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="!showContent" class="text-center mb-5">
          <b-button v-if="page.content || (page.images && page.images.length) || (page.docs && page.docs.length)" variant="secondary" @click="showMore = !showMore">
            Saiba mais
          </b-button>
        </div>
        <div v-if="showMore || showContent" class="dynamic-content mt-4">
          <div v-html="page.content" />
          <Documents :documents="page.docs" />
        </div>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slug: {
      type: String,
      default: null
    },
    showContent: {
      type: Boolean,
      default: false
    },
    breadcrumb: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editComponent: null,
      page: null,
      showMore: false,
      components: []
    }
  },
  computed: {
    editMode() {
      return this.$auth.user && (this.$auth.user.role === 'admin' || this.$auth.user.role === 'super')
    }
  },
  async created() {
    this.page = await this.$axios.$get('/api/pages/' + this.slug)
    if (this.page) {
      if (this.page.components && this.page.components.length) {
        this.components = this.page.components
      }
    } else {
      this.$emit('notFound')
    }
  },
  methods: {
    save() {
      this.page.components = this.components
      this.$axios.$put('/api/pages/' + this.page._id, { components: this.components })
      this.$toast.success('Página salva!')
    },
    closeComponent(save) {
      this.editComponent = null
      if (save) {
        this.save()
      }
    },
    addComponent(component) {
      this.components.push({
        type: null,
        attrs: {
          class: ''
        },
        content: null,
        category: null
      })
      this.editComponent = this.components.length - 1
    },
    removeComponent() {
      const components = this.components
      delete components[this.editComponent]
      this.components = [...components].filter(component => component)
      this.editComponent = null
      this.save()
    }
  }
}
</script>
