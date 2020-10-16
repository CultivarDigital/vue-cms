<template>
  <div class="women_groups">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="women_groups" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/women_groups/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="women_groups">
        <b-table v-if="women_groups.length" :fields="table" :items="women_groups" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/women_groups/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
            <b-button v-if="data.item.status !== 'approved'" variant="primary" size="sm" @click="approve(data.item)">
              Aprovar
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
      women_groups: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Grupos de mulheres', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.women_groups = await this.$axios.$get('/api/women_groups').catch(this.showError)
    },
    remove (womenGroup) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/women_groups/' + womenGroup.slug).then(() => {
            this.list()
            this.$toast.success('Grupo removido com sucesso!')
          }).catch(this.showError)
        }
      })
    },
    async approve (womenGroup) {
      await this.$axios.put('/api/women_groups/' + womenGroup.slug, { status: 'approved' }).then(() => {
        this.list()
        this.$toast.success('Grupo aprovado com sucesso!')
      }).catch(this.showError)
    }
  }
}
</script>
