<template>
  <div class="users">
    <b-breadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <b-button variant="primary" to="/admin/users/new">
        Cadastrar
      </b-button>
    </div>
    <div v-if="users">
      <b-table v-if="users.length" :fields="table" :items="users" responsive="sm">
        <template v-slot:cell(name)="data">
          <n-link :to="'/admin/users/' + data.item._id">{{ data.value }}</n-link>
        </template>
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/admin/users/' + data.item._id + '/edit'">
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
export default {
  layout: 'admin',
  data () {
    return {
      users: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Usuários', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' }
      ]
    }
  },
  created () {
    if (this.$auth.hasScope('super')) {
      this.table.push({ key: 'site.name', label: 'Site' })
      this.table.push({ key: 'roles', label: 'Perfil' })
    }
    this.table.push({ key: 'actions', label: '', class: 'text-right' })
    this.list()
  },
  methods: {
    async list () {
      this.users = await this.$axios.$get('/api/users')
    },
    remove (user) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(confirmed => {
        if (confirmed) {
          this.$axios.$delete('/api/users/' + user._id).then(res => {
            this.list()
            this.$toast.success('Usuário removido com sucesso!')
          }).catch(e => {
            this.$toast.error(e.response.data)
          })
        }
      })
    }
  }
}
</script>
