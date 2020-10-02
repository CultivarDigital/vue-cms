<template>
  <div class="pictures-upload fileinput">
    <b-form-group v-show="!isLoading" :label="label ? label : 'Foto' + (multiple ? 's' : '')" :description="'Selecione um '+ (multiple ? 'ou mais arquivos' : 'arquivo') +' no formato PNG, GIF, JPG ou JPEG, com no máximo 32 MB.'">
      <b-form-file id="files" ref="files" :multiple="multiple" accept="image/*" :placeholder="'Selecionar arquivo' + (multiple ? 's' : '')" drop-placeholder="Drop file here..." @change="uploadImages" />
      <span v-show="error" class="text-danger">{{ error }}</span>
    </b-form-group>
    <div v-if="!isLoading && showPreview" class="text-center">
      <b-row v-if="Array.isArray(form[field]) && form[field].length > 0" class="row images_preview">
        <b-col v-for="(image, index) in form[field]" :key="index" md="3">
          <div class="thumbnail">
            <b-img :src="image.thumb" fluid thumbnail />
          </div>
          <b-form-input v-model="form[field][index].title" placeholder="Título da imagem" />
          <br>
          <p>
            <span v-if="multiple">
              <b-button v-if="(image.default || (index === 0 && !hasDefault))" class="btn btn-success btn-sm" @click="setDefault(index)"><b-icon-check /> Capa </b-button>
              <b-button v-else class="btn btn-default btn-sm" @click="setDefault(index)"> Capa</b-button>
            </span>
            <b-button class="btn btn-sm" @click="deleteImage(index)"><b-icon-trash /></b-button>
          </p>
        </b-col>
      </b-row>
      <b-row v-if="!Array.isArray(form[field]) && form[field] && form[field].thumb">
        <b-col cols="3">
          <div class="thumbnail">
            <b-img :src="form[field].thumb" fluid thumbnail />
          </div>
          <b-form-input v-model="form[field].title" placeholder="Título da imagem" />
          <br>
          <b-button class="btn btn-sm" @click="deleteImage()"><b-icon-trash /></b-button>
        </b-col>
      </b-row>
      <br>
    </div>
    <b-spinner v-if="isLoading" small label="Enviando foto..." />
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  mixins: [mixinGlobal],
  props: {
    form: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: null
    },
    field: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  inject: ['$validator'],
  data () {
    return {
      isLoading: false,
      error: false
    }
  },
  computed: {
    hasDefault() {
      return this.form[this.field] && this.form[this.field].find(image => image.default)
    }
  },
  methods: {
    uploadImages(e) {
      this.isLoading = true
      this.error = null
      const files = e.target.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('image', file, file.name)
        this.$axios.$post(this.url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          if (this.multiple) {
            this.form[this.field].push(data)
          } else {
            this.form[this.field] = data
          }
          this.isLoading = false
        }).catch((error) => {
          this.isLoading = false
          this.showError(error)
        })
      }
    },
    deleteImage(index) {
      if (this.multiple) {
        this.$delete(this.form[this.field], index)
      } else {
        this.form[this.field] = null
      }
    },
    setDefault(index) {
      if (this.multiple) {
        const arr = this.form[this.field]
        this.form[this.field] = []
        arr.map((image, i) => {
          if (index === i) {
            image.default = true
          } else {
            image.default = false
          }
          this.form[this.field].push(image)
        })
        this.form[this.field] = this.form[this.field].sort((a, b) => {
          return (a.default === b.default) ? 0 : a.default ? -1 : 1
        })
      }
    },
    selectFile() {
      document.getElementById('files').click()
    }
  }
}
</script>

<style lang="sass">
.btn-success
  color: #fff !important
  cursor: initial !important
</style>
