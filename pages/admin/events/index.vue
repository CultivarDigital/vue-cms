<template>
  <div class="events">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="agenda" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/events/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="events">
        <b-table v-if="events.length" :fields="table" :items="events" responsive="sm">
          <template v-slot:cell(start_at)="data">
            {{ $moment(data.value).format("DD/MM/YYYY") }}
          </template>
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/events/' + data.item._id + '/edit'">
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
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      events: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Eventos', active: true }
      ],
      table: [
        { key: 'start_at', label: 'Data' },
        { key: 'title', label: 'Título' },
        { key: 'tags', label: 'Tags' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.events = await this.$axios.$get('/api/events').catch(this.showError)
    },
    remove (event) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/events/' + event._id).then(() => {
            this.list()
            this.$toast.success('Evento removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
