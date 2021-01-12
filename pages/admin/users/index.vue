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
        <template v-slot:cell(roles)="data">
          {{ role(data.value) }}
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
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import roles from '@/data/roles.json'

export default {
  layout: 'admin',
  mixins: [mixinGlobal],
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
    } else if (this.$auth.hasScope('admin')) {
      this.table.push({ key: 'roles', label: 'Perfil' })
      this.table.push({ key: 'organization', label: 'Organização' })
    }
    this.table.push({ key: 'actions', label: '', class: 'text-right' })
    this.list()
  },
  methods: {
    async list () {
      this.users = await this.$axios.$get('/api/users').catch(this.showError)
    },
    remove (user) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(confirmed => {
        if (confirmed) {
          this.$axios.$delete('/api/users/' + user._id).then(res => {
            this.list()
            this.$toast.success('Usuário removido com sucesso!')
          }).catch(this.showError)
        }
      })
    },
    role (userRoles) {
      if (userRoles && userRoles.length > 0) {
        return roles.find(r => r.value[0] === userRoles[0]).text
      }
    }
  }
}
</script>
