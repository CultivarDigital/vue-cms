<template>
  <div class="tags">
    <b-breadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <b-button variant="primary" to="/admin/tags/new">
        Cadastrar
      </b-button>
    </div>
    <div v-if="tags">
      <b-table v-if="tags.length" :fields="table" :items="tags" responsive="sm">
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/admin/tags/' + data.item._id + '/edit'">
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
      <b-spinner label="Carregando..." />
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
      tags: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Tags', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.tags = await this.$axios.$get('/api/tags').catch(this.showError)
    },
    remove (tag) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/tags/' + tag._id).then(() => {
            this.list()
            this.$toast.success('Tag removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
