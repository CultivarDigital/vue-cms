<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="primary" block :disabled="invalid">
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    village: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        name: '',
        pictures: []
      }
    }
  },
  created () {
    this.toForm(this.form, this.village)
  },
  methods: {
    async save () {
      if (this.village) {
        const village = await this.$axios.$put('/api/villages/' + this.village.slug, this.form).catch(this.showError)
        if (village) {
          this.$toast.success('Aldeia atualizada com sucesso!')
          this.$router.push('/admin/villages')
        }
      } else {
        const village = await this.$axios.$post('/api/villages', this.form).catch(this.showError)
        if (village) {
          this.$toast.success('Aldeia cadastrada com sucesso!')
          this.$router.push('/admin/villages')
        }
      }
    }
  }
}
</script>
