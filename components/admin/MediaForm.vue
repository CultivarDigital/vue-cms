<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-form-group label="Categoria *">
        <validation-provider v-slot="{ errors }" name="categoria" rules="required">
          <b-form-select v-model="form.category" name="category" :options="categories">
            <template v-slot:first>
              <b-form-select-option value="" disabled>-- Selecione uma categoria --</b-form-select-option>
            </template>
          </b-form-select>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <div v-if="form.category">
        <div v-if="form.category === 'Clipping' || form.category === 'Livros e Artigos Científicos' || form.category === 'Guias e Publicações Curtas' || form.category === 'Leis e Outras Normas'">
          <p v-if="form.pdf">
            <b-form-group v-if="form.picture" label="Documento PDF">
              <a :href="'https://' + $store.state.site.domain_name + form.pdf.url">{{ 'https://' + $store.state.site.domain_name + form.pdf.url }}</a>
              <br>
              <br>
              <b-button variant="primary" size="sm" @click="form.picture = null; form.pdf = null">Alterar documento</b-button>
            </b-form-group>
          </p>
          <pdfs-upload v-else :form="form" field="pdf" url="/api/uploads/pdfs" :show-preview="false" @changed="pdfSelected(pdf)" />
        </div>
        <div v-if="form.category === 'Notícias'">
          <b-form-group label="Link da notícia">
            <b-form-input v-model="form.url" @input="loadUrl" />
            <b-spinner v-if="loadingUrl" label="Carregando conteúdo da notícia" />
          </b-form-group>
          <b-button v-if="!noUrl && !form.url" variant="default" size="sm" @click="noUrl = true">Não tenho o link</b-button>
        </div>
        <div v-if="form.category === 'Vídeos'">
          <b-form-group label="Link do vídeo">
            <b-form-input v-model="form.url" @input="loadUrl" />
            <b-spinner v-if="loadingUrl" label="Carregando vídeo" />
            <div v-if="form.oembed && !loadingUrl" class="mt-3" style="max-width: 80%" v-html="form.oembed" />
          </b-form-group>
        </div>
        <div v-if="form.pdf || form.picture || form.oembed || isValidUrl(form.url) || noUrl || form.category === 'Fotografias'">
          <div v-if="form.pdf">
            <b-form-group v-if="form.picture" label="Foto de capa">
              <b-img :src="form.picture.thumb" thumbnail />
              <br>
              <br>
              <b-button variant="primary" size="sm" @click="form.picture = null">Alterar foto de capa</b-button>
            </b-form-group>
            <div v-else>
              <pictures-upload :form="form" field="picture" url="/api/uploads/images" label="Foto de capa" :show-preview="false" />
            </div>
          </div>
          <div v-else-if="form.category !== 'Vídeos'">
            <pictures-upload :form="form" field="picture" url="/api/uploads/images" :label="form.category === 'Fotografias' ? 'Enviar fotografia' : 'Foto de capa'" />
          </div>
          <b-row>
            <b-col md="12">
              <b-form-group label="Título *">
                <validation-provider v-slot="{ errors }" name="título" rules="required">
                  <b-form-input v-model="form.title" name="title" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Descrição">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Temas">
                <b-form-tags v-model="form.tags" placeholder="Insira aqui os temas..." />
                <small>ou selecione abaixo para adicionar:</small>
                <div>
                  <b-badge v-for="tag in currentTags" :key="tag" :variant="form.tags.includes(tag) ? 'default' : 'secondary'" @click="addTag(tag)">{{ tag }}</b-badge>
                </div>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Data da publicação">
                <b-form-datepicker v-model="form.publishing_date" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Editora/Fonte" description="Veículo de comunicação onde foi publicado">
                <b-form-input v-model="form.publishing_house" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button class="mb-4 mt-4" type="submit" variant="primary" block :disabled="invalid">
            Salvar
          </b-button>
        </div>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
import PicturesUpload from '@/components/admin/PicturesUpload'
import PdfsUpload from '@/components/admin/PdfsUpload'
import categories from '@/data/categories.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    PdfsUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    media: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      categories,
      changePicture: false,
      noUrl: false,
      loadingUrl: false,
      currentTags: [],
      form: {
        category: '',
        pdf: null,
        picture: null,
        title: '',
        description: '',
        tags: [],
        url: '',
        oembed: '',
        publishing_date: null,
        publishing_house: ''
      }
    }
  },
  async created() {
    this.toForm(this.form, this.media)
    this.currentTags = await this.$axios.$get('/api/medias/current_tags').catch(this.showError)
  },
  methods: {
    async save() {
      if (this.media) {
        const media = await this.$axios.$put('/api/medias/' + this.media._id, this.form).catch(this.showError)
        if (media) {
          this.$toast.success('Notícia atualizada com sucesso!')
          this.$router.push('/admin/medias')
        }
      } else {
        const media = await this.$axios.$post('/api/medias', this.form).catch(this.showError)
        if (media) {
          this.$toast.success('Notícia cadastrada com sucesso!')
          this.$router.push('/admin/medias')
        }
      }
    },
    pdfSelected() {
      this.form.picture = {
        ...this.form.pdf
      }
      this.form.picture.url = this.form.picture.average
    },
    async loadUrl() {
      if (this.isValidUrl(this.form.url)) {
        this.loadingUrl = true
        const res = await this.$axios.$get('/api/uploads/oembed?url=' + encodeURI(this.form.url)).catch((e) => {
          this.loadingUrl = false
          this.showError(e)
        })
        if (res) {
          this.form.title = res.title
          if (res.description) {
            this.form.description = res.description
            const tags = res.description.split(' ').filter(v => v.startsWith('#')).map(v => v.replace('#', ''))
            if (tags && tags.length) {
              this.form.tags = tags
            }
          } else {
            this.form.description = ''
          }
          if (res.thumbnail_url) {
            this.form.picture = {
              url: res.thumbnail_url,
              thumb: res.thumbnail_url,
              average: res.thumbnail_url
            }
          } else {
            this.form.picture = null
          }
          if (!res.html || res.html.includes('iframely-embed')) {
            this.form.oembed = undefined
          } else {
            this.form.oembed = res.html
          }
          this.form.publishing_house = res.provider_name
        }
        this.loadingUrl = false
      }
    },
    isValidUrl (string) {
      let url = false
      try {
        url = new URL(string)
      } catch (_) {
        return url
      }
      return url
    },
    addTag (tag) {
      if (!this.form.tags.includes(tag)) {
        this.form.tags.push(tag)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .badge.badge-secondary
      cursor: pointer
</style>
