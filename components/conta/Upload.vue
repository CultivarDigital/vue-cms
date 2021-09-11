<template>
  <div>
    <b-form-group
      :label="label"
      :description="description"
    >
      <b-modal :id="'new-attachment-modal-' + inputId" title="Selecione ou envie" hide-footer size="lg">
        <div class="text-center">
          <b-btn variant="success" class="mb-3" @click="uploadClick">
            <b-icon-upload />
            Envie um arquivo
          </b-btn>
          <div v-if="attachments">
            <div v-if="attachments.length">
              <p>Ou selecione da galeria:</p>
              <b-input-group class="mb-4">
                <b-input v-model="search" placeholder="Buscar" />
                <template #append>
                  <b-input-group-text>
                    <b-icon-search />
                  </b-input-group-text>
                </template>
              </b-input-group>
              <Gallery :attachments="gallery" select @select="callbackUploaded" />
            </div>
          </div>
          <div v-else class="text-center mt-3">
            <b-spinner small />
          </div>
        </div>
      </b-modal>
      <div v-if="showPreview && !avatar && preview && preview.length">
        <div>
          <table class="table b-table b-table-stacked-sm">
            <tbody>
              <tr v-for="(attachment, index) in preview" :key="index">
                <td class="img-td">
                  <b-img v-if="attachment.thumb" :src="attachment.thumb || attachment.url" width="100" thumbnail />
                  <div v-else style="width: 100px; height: 100px;" class="text-center m-auto">
                    <b-icon-image v-if="attachment.type === 'images'" class="thumb-icon" />
                    <b-icon-file-earmark-text v-else class="thumb-icon" />
                  </div>
                </td>
                <td>
                  <b-modal :id="'attachment-modal-' + inputId + '-' + index" title="Editar" hide-footer size="lg">
                    <AttachmentForm v-if="attachment" :type="type" :value="preview[index]" @input="(updated) => attachmentUpdated(updated, index)" @remove="() => deleteFile(index)" />
                  </b-modal>
                  <p v-if="attachment.title" class="mb-2"><strong>{{ attachment.title }}</strong></p>
                  <p v-if="attachment.description" class="mb-3">{{ attachment.description }}</p>
                  <b-btn variant="secondary" size="sm" @click="$bvModal.show('attachment-modal-' + inputId + '-' + index)">
                    <b-icon-pencil /> Editar
                  </b-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-button v-if="is_loading" variant="secondary" disabled>
        <b-spinner small />
        Enviando arquivos...
      </b-button>
      <a v-else-if="avatar" @click="upload">
        <b-avatar
          size="6rem"
          :src="preview && preview[0] && preview[0].thumb ? preview[0].thumb : null"
        >
          <template #badge><b-icon-camera /></template>
        </b-avatar>
      </a>
      <b-btn v-else variant="success" @click="upload">
        <b-icon-upload />
        Enviar {{ type === 'images' ? 'image' + (multiple ? 'ns' : 'm') : 'arquivo' + (multiple ? 's' : '') }}
      </b-btn>
      <input
        v-show="false"
        :ref="'uploads-input-' + inputId"
        :multiple="multiple"
        :accept="accept"
        type="file"
        @change="uploadFiles"
      >
    </b-form-group>
  </div>
</template>

<script>
import slugify from 'slugify'
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
      default: 'Arquivos'
    },
    description: {
      type: String,
      default: null
    },
    type: {
      type: String,
      required: true
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    editTitle: {
      type: Boolean,
      default: false
    },
    editDescription: {
      type: Boolean,
      default: false
    },
    editLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_loading: false,
      attachments: null,
      search: ''
    }
  },
  computed: {
    gallery() {
      if (this.attachments && this.search) {
        return this.attachments.filter((attachment) => {
          const search = slugify(this.search).toLowerCase()
          const text = slugify(
            (attachment.title + attachment.description + attachment.url) || ''
          ).toLowerCase()
          return text.includes(search)
        })
      } else {
        return this.attachments
      }
    },
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
    openImage(attachment, index) {
      if (this.multiple) {
        const ret = [...this.value]
        ret[index] = attachment
        this.$emit('input', ret)
      } else {
        this.$emit('input', attachment)
      }
      this.$bvModal.hide('attachment-modal-' + this.inputId + '-' + index)
    },
    attachmentUpdated(attachment, index) {
      if (this.multiple) {
        const ret = [...this.value]
        ret[index] = attachment
        this.$emit('input', ret)
      } else {
        this.$emit('input', attachment)
      }
      this.$bvModal.hide('attachment-modal-' + this.inputId + '-' + index)
    },
    uploadFiles(e) {
      this.$bvModal.hide('new-attachment-modal-' + this.inputId)
      this.is_loading = true
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('file', file, file.name)
        this.$axios
          .$post('/api/uploads/' + this.type, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((uploaded) => {
            this.callbackUploaded(uploaded)
            this.is_loading = false
          })
      }
    },
    callbackUploaded(uploaded) {
      if (this.multiple) {
        let ret = [uploaded]
        if (this.value) {
          ret = this.value.concat(uploaded)
        }
        this.$emit('input', ret)
      } else {
        this.$emit('input', uploaded)
      }
      this.$emit('uploaded', uploaded)
      this.$bvModal.hide('new-attachment-modal-' + this.inputId)
    },
    deleteFile(index) {
      if (this.multiple) {
        this.$emit(
          'input',
          this.value.filter((item, i) => i !== index)
        )
      } else {
        this.$emit('input', null)
      }
      this.$bvModal.hide('attachment-modal-' + this.inputId + '-' + index)
    },
    async upload() {
      this.attachments = null
      this.attachments = await this.$axios.$get('/api/attachments', { params: { type: this.type } })
      this.$bvModal.show('new-attachment-modal-' + this.inputId)
    },
    uploadClick() {
      // eslint-disable-next-line dot-notation
      this.$refs['uploads-input-' + this.inputId].click()
    }
  }
}
</script>
