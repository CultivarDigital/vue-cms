<template>
  <div class="planting_areas">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="planting_areas" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <!-- <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button> -->
        <b-button variant="primary" to="/admin/planting_areas/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="planting_areas">
        <b-table v-if="planting_areas.length" :fields="table" :items="planting_areas" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/planting_areas/' + data.item._id + '/edit'">
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
      planting_areas: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Áreas de plantio', active: true }
      ],
      table: [
        { key: 'address.uf', label: 'Estado' },
        { key: 'address.city', label: 'Município' },
        { key: 'qtd', label: 'Quantidade de plantios' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.planting_areas = await this.$axios.$get('/api/planting_areas').catch(this.showError)
    },
    remove (plantingArea) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/planting_areas/' + plantingArea._id).then(() => {
            this.list()
            this.$toast.success('Área de plantio removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
