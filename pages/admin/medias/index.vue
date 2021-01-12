<template>
  <div class="medias">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="biblioteca" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/medias/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="medias">
        <b-table v-if="medias.length" :fields="table" :items="medias" responsive="sm">
          <template v-slot:cell(picture)="data">
            <b-img :src="data.value.thumb" thumbnail />
          </template>
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(publishing_date)="data">
            {{ $moment(data.value).format(data.item.publishing_date_format || "DD/MM/YYYY") }}
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/medias/' + data.item._id + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
    </div>
  </div>
</template>
<script>
import mixinGlobal from '@/mixins/global'
import PageForm from '@/components/admin/PageForm'
export default {
  layout: 'admin',
  components: {
    PageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      medias: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Biblioteca', active: true }
      ],
      table: [
        { key: 'picture', label: '' },
        { key: 'title', label: 'Título' },
        { key: 'category', label: 'Categoria' },
        { key: 'tags', label: 'Tags' },
        { key: 'publishing_date', label: 'Publicação' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.medias = await this.$axios.$get('/api/medias').catch(this.showError)
    },
    remove (media) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/medias/' + media._id).then(() => {
            this.list()
            this.$toast.success('Ítem removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
