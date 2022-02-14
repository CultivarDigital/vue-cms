<template>
  <div>
    <div v-if="form">
      <b-sidebar
        :visible="true"
        :title="
          form.category
            ? 'Editar ' + categories[form.category].title
            : 'Adicionar elemento'
        "
        right
        shadow
        @hidden="close"
      >
        <div class="px-3 py-3">
          <div>
            <div v-if="form.category">
              <div v-if="form.category === 'title'">
                <b-form-group :label="'Tamanho do título '">
                  <b-btn-group>
                    <b-btn
                      :variant="form.type === 'h1' ? 'primary' : 'secondary'"
                      @click="setType('h1')"
                    >
                      H1
                    </b-btn>
                    <b-btn
                      :variant="form.type === 'h2' ? 'primary' : 'secondary'"
                      @click="setType('h2')"
                    >
                      H2
                    </b-btn>
                    <b-btn
                      :variant="form.type === 'h3' ? 'primary' : 'secondary'"
                      @click="setType('h3')"
                    >
                      H3
                    </b-btn>
                    <b-btn
                      :variant="form.type === 'h4' ? 'primary' : 'secondary'"
                      @click="setType('h4')"
                    >
                      H4
                    </b-btn>
                    <b-btn
                      :variant="form.type === 'h5' ? 'primary' : 'secondary'"
                      @click="setType('h5')"
                    >
                      H5
                    </b-btn>
                    <b-btn
                      :variant="form.type === 'h6' ? 'primary' : 'secondary'"
                      @click="setType('h6')"
                    >
                      H6
                    </b-btn>
                  </b-btn-group>
                </b-form-group>
                <b-form-group :label="'Texto do título'">
                  <b-form-input v-model="form.content" @input="input" />
                </b-form-group>
              </div>
              <div v-if="form.category === 'paragraph'">
                <b-form-group :label="'Texto do parágrafo'">
                  <quill-editor
                    ref="quillEdit"
                    v-model="form.content"
                    style="background-color: #fff;"
                    @input="input"
                  />
                </b-form-group>
              </div>
              <div v-if="form.category === 'card'">
                <b-form-group label="Tipo de card">
                  <b-btn size="sm" :variant="(!form.attrs.orientation || form.attrs.orientation === 'horizontal') ? 'primary' : 'secondary'" @click="form.attrs.orientation = 'horizontal'; input()">
                    <b-icon-grip-vertical /> Horizontal
                  </b-btn>
                  <b-btn size="sm" :variant="form.attrs.orientation === 'vertical' ? 'primary' : 'secondary'" @click="form.attrs.orientation = 'vertical'; input()">
                    <b-icon-grip-horizontal /> Vertical
                  </b-btn>
                </b-form-group>
                <b-form-group label="Imagem">
                  <b-form-input v-model="form.attrs['img-src']" placeholder="URL da imagem" class="mb-1" @input="input" />
                  <div v-if="form.attrs.orientation !== 'vertical'">
                    <b-btn size="sm" :variant="(!form.attrs['img-align'] || form.attrs['img-align'] === 'left') ? 'primary' : 'secondary'" @click="form.attrs['img-align'] = 'left'; input()">
                      <b-icon-text-left />
                    </b-btn>
                    <b-btn size="sm" :variant="form.attrs['img-align'] === 'right' ? 'primary' : 'secondary'" @click="form.attrs['img-align'] = 'right'; input()">
                      <b-icon-text-right />
                    </b-btn>
                  </div>
                </b-form-group>
                <b-form-group label="Cabeçalho">
                  <b-form-input v-model="form.attrs.header" @input="input" />
                </b-form-group>
                <b-form-group label="Título">
                  <b-form-input v-model="form.attrs.title" @input="input" />
                </b-form-group>
                <b-form-group label="Subtítulo">
                  <b-form-input v-model="form.attrs['sub-title']" @input="input" />
                </b-form-group>
                <b-form-group label="Texto">
                  <b-form-textarea v-model="form.attrs.text" @input="input" />
                </b-form-group>
                <b-form-group label="Rodapé">
                  <b-form-input v-model="form.attrs.footer" @input="input" />
                </b-form-group>
                <AddLink v-model="form.attrs.links" @input="input" />
                <b-form-group label="Cor de fundo">
                  <b-btn v-for="variant in variants" :key="variant" size="sm" :variant="variant" @click="form.attrs['bg-variant'] = variant; input()">
                    <b-icon-check-circle v-if="form.attrs['bg-variant'] === variant" />
                    <b-icon-check v-else />
                  </b-btn>
                </b-form-group>
                <b-form-group label="Alinhamento">
                  <b-btn size="sm" :variant="form.attrs.align === 'left' ? 'primary' : 'secondary'" @click="form.attrs.align = 'left'; input()">
                    <b-icon-text-left />
                  </b-btn>
                  <b-btn size="sm" :variant="form.attrs.align === 'center' ? 'primary' : 'secondary'" @click="form.attrs.align = 'center'; input()">
                    <b-icon-text-center />
                  </b-btn>
                  <b-btn size="sm" :variant="form.attrs.align === 'right' ? 'primary' : 'secondary'" @click="form.attrs.align = 'right'; input()">
                    <b-icon-text-right />
                  </b-btn>
                </b-form-group>
              </div>
              <div v-if="form.category === 'banners'">
                <Upload v-model="form.attrs.items" label="Banners" type="images" multiple edit-title edit-description edit-link @input="input" />
              </div>
              <div class="text-right">
                <b-btn
                  variant="default"
                  size="sm"
                  class="mb-4"
                  @click="advancedMode = !advancedMode"
                >
                  Opções avançadas
                  <b-icon-chevron-down v-if="advancedMode" />
                  <b-icon-chevron-right v-else />
                </b-btn>
              </div>
              <div v-if="advancedMode">
                <b-form-group label="Classes de estilo">
                  <b-form-input v-model="form.attrs.class" @input="input" />
                </b-form-group>
              </div>
              <div v-if="changed" class="pt-2 mb-4">
                <b-btn size="lg" variant="primary" block @click="close()">
                  Concluír
                </b-btn>
              </div>
              <div class="text-right">
                <b-btn variant="danger" @click="$emit('remove')">Remover</b-btn>
              </div>
            </div>
            <div v-else>
              <b-btn
                v-for="key in Object.keys(categories)"
                :key="key"
                block
                @click="setCategory(key)"
              >
                {{ categories[key].title }}
              </b-btn>
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
        },
        card: {
          title: 'Card',
          default: 'dynamic-card'
        },
        banners: {
          title: 'Banners',
          default: 'dynamic-banners'
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
      advancedMode: false,
      variants: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark'
      ]
    }
  },
  watch: {
    value() {
      this.form = { ...this.value }
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
