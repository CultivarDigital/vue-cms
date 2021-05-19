<template>
  <div class="documents-upload">
    <b-form-group
      :label="label"
    >
      <div v-if="preview && preview.length">
        <table class="table b-table b-table-stacked-sm mb-0">
          <tbody>
            <tr v-for="(doc, index) in preview" :key="index">
              <td>
                <a :href="doc" target="_blank">
                  <b-icon-download />
                  {{ doc | filename }}
                </a>
              </td>
              <td>
                <a
                  class="btn btn-secondary btn-sm pull-right"
                  @click="deleteDocument(index)"
                ><b-icon-trash /></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-button v-if="is_loading" variant="primary" disabled>
        <b-spinner small />
        Loading...
      </b-button>
      <b-btn v-else variant="primary" @click="upload">
        <b-icon-upload />
        Enviar arquivo{{ multiple ? 's' : '' }}
      </b-btn>
      <input
        :ref="'uploads-input-' + inputId"
        :multiple="multiple"
        :accept="accept"
        type="file"
        @change="uploadDocuments"
      >
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, Array],
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Documentos'
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      is_loading: false
    }
  },
  computed: {
    inputId() {
      return Math.random().toString(36).substring(2, 15)
    },
    accept() {
      if (this.type === 'documents') {
        return 'application/msword, application/vnd.google-earth.kml+xml, image/*, application/pdf'
      } else if (this.type === 'images') {
        return 'image/*'
      }
      return null
    },
    preview() {
      if (Array.isArray(this.value)) {
        return this.value
      } else if (this.value) {
        return [this.value]
      }
      return []
    }
  },
  methods: {
    uploadDocuments(e) {
      this.is_loading = true
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('document', file, file.name)
        this.$axios
          .$post('/api/uploads/' + this.type, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            if (this.multiple) {
              this.$emit('input', this.value.concat(response))
            } else {
              this.$emit('input', response)
            }
            this.is_loading = false
          })
          .catch(this.showError)
      }
    },
    deleteDocument(index) {
      if (this.multiple) {
        this.$emit(
          'input',
          this.value.filter((item, i) => i !== index)
        )
      } else {
        this.$emit('input', null)
      }
    },
    fileName(doc) {
      if (doc) {
        const docUrl = doc.split('/')
        return docUrl[docUrl.length - 1]
      }
    },
    upload() {
      // eslint-disable-next-line dot-notation
      this.$refs['uploads-input-' + this.inputId].click()
    }
  }
}
</script>
