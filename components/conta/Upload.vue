<template>
  <div>
    <b-form-group
      :label="label"
      :description="description"
    >
      <b-modal v-if="type === 'images'" id="new-attachment-modal" title="Selecione ou envie uma nova imagem" hide-footer size="lg">
        <div class="text-center">
          <b-btn variant="success" @click="uploadClick">
            <b-icon-upload />
            Envie uma nova imagem
          </b-btn>
          <hr>
          <div>
            <p>Selecione uma imagem da galeria:</p>
            <Gallery :images="gallery" select @select="callbackUploaded" />
          </div>
        </div>
      </b-modal>
      <div v-if="showPreview && !avatar && preview && preview.length">
        <table class="table b-table b-table-stacked-sm mb-1">
          <tbody>
            <tr v-for="(attachment, index) in preview" :key="index">
              <td style="width: 100px;">
                <b-modal :id="'attachment-modal-' + index" title="Dados da imagem" hide-footer size="lg">
                  <AttachmentForm v-if="attachment" :value="preview[index]" @input="(updated) => attachmentUpdated(updated, index)" />
                </b-modal>
                <a @click="$bvModal.show('attachment-modal-' + index)">
                  <b-img v-if="attachment.thumb" :src="attachment.thumb" fluid thumbnail width="100" />
                  <b-icon-image v-else-if="type === 'images'" scale="2" />
                  <b-icon-file-earmark-text v-else scale="2" />
                </a>
              </td>
              <td v-if="type === 'images'">
                <p v-if="attachment.title" class="mb-1"><strong>{{ attachment.title }}</strong></p>
                <p v-if="attachment.description" class="mb-1">{{ attachment.description }}</p>
                <p v-if="attachment.link" class="mb-1">Link: <small><a :href="attachment.link">{{ attachment.link_title || attachment.link }}</a></small></p>
              </td>
              <td v-else-if="editTitle || editDescription || editLink">
                <b-form-input v-if="editTitle" v-model="attachment.title" placeholder="Título" class="mt-1" />
                <b-form-textarea v-if="editDescription" v-model="attachment.description" placeholder="Descrição" class="mt-1" />
                <b-form-input v-if="editLink" v-model="attachment.link" placeholder="Link" class="mt-1" />
                <b-form-input v-if="editLink" v-model="attachment.link_title" placeholder="Título do link" class="mt-1" />
              </td>
              <td v-if="type !== 'images' && editDescription" />
              <td class="text-md-right">
                <b-btn variant="light" size="sm" @click="deleteFile(index)">
                  <b-icon-trash />
                </b-btn>
              </td>
            </tr>
          </tbody>
        </table>
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
      gallery: []
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
  async created() {
    this.gallery = await this.$axios.$get('/api/attachments')
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
      this.$bvModal.hide('attachment-modal-' + index)
    },
    attachmentUpdated(attachment, index) {
      if (this.multiple) {
        const ret = [...this.value]
        ret[index] = attachment
        this.$emit('input', ret)
      } else {
        this.$emit('input', attachment)
      }
      this.$bvModal.hide('attachment-modal-' + index)
    },
    uploadFiles(e) {
      this.$bvModal.hide('new-attachment-modal')
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
      if (this.type === 'images') {
        this.$bvModal.hide('new-attachment-modal')
        this.$bvModal.show('attachment-modal-' + (this.preview.length - 1))
      }
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
    },
    upload() {
      // eslint-disable-next-line dot-notation
      if (this.type === 'images') {
        this.$bvModal.show('new-attachment-modal')
      } else {
        this.uploadClick()
      }
    },
    uploadClick() {
      // eslint-disable-next-line dot-notation
      this.$refs['uploads-input-' + this.inputId].click()
    }
  }
}
</script>
