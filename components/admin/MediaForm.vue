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
        <div v-if="form.category == 'Publicações'">
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
        <div v-if="form.pdf || form.url || form.picture || form.oembed">
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
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Data da publicação">
                <b-form-datepicker v-model="form.publishing_date" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Editora" description="Veículo de comunicação onde foi publicado">
                <b-form-input v-model="form.publishing_house" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button class="mb-4 mt-4" type="submit" variant="primary" block :disabled="invalid">
            Salvar
          </b-button>
        </div>
      </div>
      <pre>{{ form }}</pre>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
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
  data () {
    return {
      categories,
      changePicture: false,
      form: {
        category: 'Publicações',
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
  created () {
    this.toForm(this.form, this.media)
  },
  methods: {
    async save () {
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
    pdfSelected () {
      this.form.picture = { ...this.form.pdf }
      this.form.picture.url = this.form.picture.average
    }
  }
}
</script>
