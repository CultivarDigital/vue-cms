<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome do produto *">
            <validation-provider v-slot="{ errors }" name="produto" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Resumo do produto *">
            <validation-provider v-slot="{ errors }" name="resumo do produto" rules="required">
              <b-form-textarea v-model="form.description" name="description" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição completa">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Preço de venda *">
            <validation-provider v-slot="{ errors }" name="preço de venda" rules="required">
              <money v-model="form.price" class="form-control" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Quantidade disponível para venda *">
            <validation-provider v-slot="{ errors }" name="estoque" rules="required">
              <b-input v-model="form.qtd" type="number" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" multiple label="Fotos do produto" />
        </b-col>
        <b-col md="12">
          <documents-upload :form="form" field="documents" url="/api/uploads/documents" multiple label="Outros documentos/arquivos" />
        </b-col>
        <b-col md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </b-col>
        <b-col md="12">
          <b-form-checkbox v-model="form.published" switch class="mt-3">
            Este produto está publicado para venda? <b>{{ form.published ? 'Sim' : 'Não' }}</b>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="success" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
import PicturesUpload from '@/components/admin/PicturesUpload'
import DocumentsUpload from '@/components/admin/DocumentsUpload'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    DocumentsUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        name: '',
        description: '',
        content: '',
        price: 0,
        qtd: 0,
        documents: [],
        pictures: [],
        tags: [],
        published: true
      }
    }
  },
  async created () {
    this.toForm(this.form, this.product)
    this.currentTags = await this.$axios.$get('/api/products/current_tags').catch(this.showError)
  },
  methods: {
    async save () {
      if (this.product) {
        const product = await this.$axios.$put('/api/products/' + this.product._id, this.form).catch(this.showError)
        if (product) {
          this.$toast.success('Produto atualizado com sucesso!')
          this.$router.push('/admin/ecommerce/products')
        }
      } else {
        const product = await this.$axios.$post('/api/products', this.form).catch(this.showError)
        if (product) {
          this.$toast.success('Produto cadastrado com sucesso!')
          this.$router.push('/admin/ecommerce/products')
        }
      }
    }
  }
}
</script>
