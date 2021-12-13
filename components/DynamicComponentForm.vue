<template>
  <div>
    <div v-if="form">
      <b-sidebar :visible="true" :title="(form.category ? 'Editar ' + categories[form.category].title : 'Adicionar elemento')" right shadow @hidden="close">
        <div class="px-3 py-3">
          <div>
            <div v-if="form.category">
              <div v-if="form.category === 'title'">
                <b-form-group :label="'Tamanho do título '">
                  <b-btn-group>
                    <b-btn :variant="form.type === 'h1' ? 'primary' : 'secondary'" @click="setType('h1')">H1</b-btn>
                    <b-btn :variant="form.type === 'h2' ? 'primary' : 'secondary'" @click="setType('h2')">H2</b-btn>
                    <b-btn :variant="form.type === 'h3' ? 'primary' : 'secondary'" @click="setType('h3')">H3</b-btn>
                    <b-btn :variant="form.type === 'h4' ? 'primary' : 'secondary'" @click="setType('h4')">H4</b-btn>
                    <b-btn :variant="form.type === 'h5' ? 'primary' : 'secondary'" @click="setType('h5')">H5</b-btn>
                    <b-btn :variant="form.type === 'h6' ? 'primary' : 'secondary'" @click="setType('h6')">H6</b-btn>
                  </b-btn-group>
                </b-form-group>
                <b-form-group :label="'Texto do título'">
                  <b-form-input v-model="form.content" @input="input" />
                </b-form-group>
              </div>
              <div v-if="form.category === 'paragraph'">
                <b-form-group :label="'Texto do parágrafo'">
                  <quill-editor ref="quillEdit" v-model="form.content" style="background-color: #fff" @input="input" />
                </b-form-group>
              </div>
              <div class="text-right">
                <b-btn variant="default" size="sm" class="mb-4" @click="advancedMode = !advancedMode">
                  Opções avançadas
                  <b-icon-chevron-down v-if="advancedMode" />
                  <b-icon-chevron-right v-else />
                </b-btn>
              </div>
              <div v-if="advancedMode">
                <b-form-group :label="'Classes de estilo'">
                  <b-form-input v-model="form.attrs.class" @input="input" />
                </b-form-group>
              </div>
              <div v-if="changed" class="pt-2 mb-4">
                <b-btn size="lg" variant="primary" block @click="close();">Concluír</b-btn>
              </div>

              <div class="text-right">
                <b-btn variant="danger" @click="$emit('remove')">Remover</b-btn>
              </div>
            </div>
            <div v-else>
              <b-btn v-for="key in Object.keys(categories)" :key="key" block @click="setCategory(key);">{{ categories[key].title }}</b-btn>
            </div>
          </div>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      categories: {
        title: {
          title: 'Título',
          default: 'h1'
        },
        paragraph: {
          title: 'Parágrafo',
          default: 'p'
        }
      },
      form: {
        type: null,
        attrs: {
          class: ''
        },
        content: null,
        category: null
      },
      changed: false,
      advancedMode: false
    }
  },
  watch: {
    value() {
      this.form = { ...this.value }
      console.log('watch', this.value)
    }
  },
  created() {
    this.form = { ...this.value }
  },
  methods: {
    setType(type) {
      this.form.type = type
      this.input()
    },
    setCategory(category) {
      this.form.category = category
      if (category) {
        this.setType(this.categories[category].default)
      } else {
        this.setType(null)
      }
      console.log('setCat')
    },
    input() {
      this.$emit('input', this.form)
      this.changed = true
    },
    close() {
      this.$emit('close', this.changed)
    }
  }
}
</script>
