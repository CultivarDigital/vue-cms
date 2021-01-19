<template>
  <div class="documents-upload">
    <b-form-group v-show="!isLoading" label="Outros documentos/arquivos" :description="'Selecione um '+ (multiple ? 'ou mais arquivos' : 'arquivo') +' com no máximo 32 MB.'">
      <b-form-file id="files" ref="files" :multiple="multiple" @change="uploadDocuments" />
      <span v-show="error" class="text-danger">{{ error }}</span>
    </b-form-group>
    <div v-if="!isLoading && showPreview">
      <b-row v-if="Array.isArray(form[field]) && form[field].length > 0">
        <b-col v-for="(doc, index) in form[field]" :key="index" cols="3" class="text-center">
          <a :href="doc.url" target="_blank">{{ doc.filename || doc.url }}</a>
          <br>
          <b-form-input v-model="form[field][index].title" placeholder="Nome do documento" />
          <b-button class="btn btn-sm" @click="deleteDocument(index)"><b-icon-trash /> Remover</b-button>
        </b-col>
      </b-row>
      <b-row v-if="!Array.isArray(form[field]) && form[field]">
        <b-col cols="3" class="text-center">
          <a :href="form[field].url" target="_blank">{{ form[field].filename || form[field].url }}</a>
          <br>
          <b-form-input v-model="form[field].title" placeholder="Nome do documento" />
          <br>
          <b-button class="btn btn-sm" @click="deleteDocument()"><b-icon-trash /> Remover</b-button>
        </b-col>
      </b-row>
    </div>
    <b-spinner v-if="isLoading" small label="Enviando foto..." />
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
    },
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: false,
      error: false
    }
  },
  methods: {
    uploadDocuments(e) {
      this.error = false
      this.isLoading = true
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('document', file, file.name)
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
          this.changed()
        }).catch((error) => {
          this.isLoading = false
          this.showError(error)
        })
      }
    },
    deleteDocument(index) {
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
    },
    changed() {
      this.$emit('changed', this.form[this.field])
    }
  }
}
</script>
