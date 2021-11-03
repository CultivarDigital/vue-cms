<template>
  <b-tabs content-class="mt-3">
    <b-tab title="Configurações gerais">
      <ValidationObserver v-slot="{ validate, invalid }">
        <b-form @submit.prevent="validate().then(save)">
          <b-form-group label="Nome/Título do site*">
            <validation-provider v-slot="{ errors }" name="título do site" rules="required">
              <b-form-input v-model="form.title" name="title" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Descrição curta do site" description="Um resumo do conteúdo do site com até 160 caracteres.">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
          <b-form-group label="Email de contato">
            <b-form-input v-model="form.email" name="email" />
          </b-form-group>
          <b-form-group label="Outros Contatos">
            <b-form-textarea v-model="form.contact" name="contact" />
          </b-form-group>
          <b-form-group label="Link do Facebook">
            <b-form-input v-model="form.url_facebook" name="url_facebook" />
          </b-form-group>
          <b-form-group label="Link do Twitter">
            <b-form-input v-model="form.url_twitter" name="url_twitter" />
          </b-form-group>
          <b-form-group label="Link do Instagram">
            <b-form-input v-model="form.url_instagram" name="url_instagram" />
          </b-form-group>
          <b-form-group label="Link do Youtube">
            <b-form-input v-model="form.url_youtube" name="url_youtube" />
          </b-form-group>
          <Upload v-model="form.site_logo" label="Logo do site" type="images" />
          <Upload v-model="form.site_favicon" label="Favicon do site" type="images" />
          <Upload v-model="form.site_banners" label="Banners da home" type="images" description="Envie as imagens na ordem que aparecerão na tela de início. Tamanho recomendado: 1920x1200 pixels" multiple edit-title edit-description edit-link />
          <b-button type="submit" variant="success" block :disabled="invalid">
            Salvar
          </b-button>
        </b-form>
      </ValidationObserver>
    </b-tab>
    <b-tab v-if="$auth.user.role === 'super'" title="Funcionalidades">
      <ValidationObserver v-slot="{ validate, invalid }">
        <b-form @submit.prevent="validate().then(save)">
          <b-list-group>
            <b-list-group-item v-for="key in Object.keys(form.features)" :key="key">
              <div class="d-flex justify-content-between align-items-center">
                <strong>{{ features[key].title }}</strong>
                <span>
                  <b-btn v-if="form.features[key].enabled" variant="default" @click="edit(key)"><b-icon-tools /></b-btn>
                  <b-form-checkbox v-model="form.features[key].enabled" switch class="d-inline-block" />
                </span>
              </div>
              <div v-if="editing === key && form.features[key].enabled">
                <hr>
                <b-form-group label="Título da funcionalidade: ">
                  <b-form-input v-model="form.features[key].title" />
                </b-form-group>
                <b-form-group v-if="key === 'shop'" label="CEP de origem" description="Será usado como base para cálculo do frete na loja">
                  <validation-provider v-slot="{ errors }" name="CEP de origem" rules="required|min:9|max:9">
                    <b-form-input v-model="form.features[key].postal_code" v-mask="'#####-###'" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </validation-provider>
                </b-form-group>
              </div>
            </b-list-group-item>
          </b-list-group>
          <br>
          <b-button type="submit" variant="success" block :disabled="invalid">
            Salvar
          </b-button>
          <pre>{{ form.features }}</pre>
          <pre>{{ features }}</pre>
        </b-form>
      </ValidationObserver>
    </b-tab>
  </b-tabs>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'
import features from '@/data/features.js'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    settings: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      features,
      editing: null,
      form: {
        title: '',
        description: '',
        contact: '',
        email: '',
        site_logo: null,
        site_favicon: null,
        site_banners: [],
        url_facebook: '',
        url_twitter: '',
        url_instagram: '',
        url_youtube: '',
        features: JSON.parse(JSON.stringify(features))
      }
    }
  },
  created () {
    this.toForm(this.form, this.settings)
    this.form.features = JSON.parse(JSON.stringify(features))
    if (this.settings.features) {
      Object.keys(this.form.features).forEach(key => {
        if (this.settings.features[key]) {
          Object.keys(this.settings.features[key]).forEach(setting => {
            this.form.features[key][setting] = this.settings.features[key][setting]
          })
        }
      })
    }
  },
  methods: {
    edit(item) {
      if (this.editing === item) {
        this.editing = null
      } else {
        this.editing = item
      }
    },
    async save () {
      const settings = await this.$axios.$post('/api/settings', this.form)
      if (settings) {
        this.$store.commit('updateSettings', settings)
        this.$toast.success('As configurações foram salvas!')
        // this.$router.push('/conta')
      }
    }
  }
}
</script>
