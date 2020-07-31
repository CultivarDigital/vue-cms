<template>
  <div class="pdfs-upload">
    <b-form-group v-show="!isLoading" :label="'Documento' + (multiple ? 's' : '') + ' PDF'" :description="'Selecione um '+ (multiple ? 'ou mais arquivos' : 'arquivo') +' no formato PDF, com no máximo 32 MB.'">
      <b-form-file id="files" ref="files" :multiple="multiple" accept="application/pdf" @change="uploadPdfs" />
      <span v-show="error" class="text-danger">{{ error }}</span>
    </b-form-group>
    <div v-if="!isLoading">
      <b-row v-if="Array.isArray(form[field]) && form[field].length > 0">
        <b-col v-for="(doc, index) in form[field]" :key="index" cols="3" class="text-center">
          <a :href="doc.url" target="_blank"><b-img :src="doc.average" fluid thumbnail /></a>
          <br>
          <br>
          <b-button class="btn btn-sm" @click="deletePdf(index)"><b-icon-trash /> Remover</b-button>
        </b-col>
      </b-row>
      <b-row v-if="!Array.isArray(form[field]) && form[field]">
        <b-col cols="3" class="text-center">
          <a :href="form[field].url" target="_blank"><b-img :src="form[field].average" fluid thumbnail /></a>
          <br>
          <b-button class="btn btn-sm" @click="deletePdf()"><b-icon-trash /> Remover</b-button>
        </b-col>
      </b-row>
    </div>
    <b-spinner v-if="isLoading" label="Enviando foto..." />
    <br>
    <br>
  </div>
</template>

<script>
export default {
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
    }
  },
  data() {
    return {
      isLoading: false,
      error: false
    }
  },
  methods: {
    uploadPdfs(e) {
      this.error = false
      this.isLoading = true
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('pdf', file, file.name)
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
    deletePdf(index) {
      if (this.multiple) {
        this.$delete(this.form[this.field], index)
      } else {
        this.form[this.field] = null
      }
    },
    fileName(doc) {
      if (doc) {
        const docUrl = doc.split('/')
        return docUrl[docUrl.length - 1]
      }
    }
  }
}
</script>

<style lang="sass">
.brand h1
  margin-top: 10px
  font-size: 31px
  a
  color: #fff
  span
  font-weight: 300
  strong
  font-weight: 900
  </style>
