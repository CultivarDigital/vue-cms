<template>
  <div class="learning_units">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="learning_units" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <!-- <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button> -->
        <b-button variant="primary" to="/admin/learning_units/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="learning_units">
        <b-table v-if="learning_units.length" :fields="table" :items="learning_units" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/learning_units/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
          <template v-slot:cell(area_size)="data">
            <span v-if="data.value">{{ data.value }} hectares</span>
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
      learning_units: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Unidades de aprendizado', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'area_size', label: 'Tamanho da área' },
        { key: 'planting_time', label: 'Mês/Ano do plantio' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.learning_units = await this.$axios.$get('/api/learning_units', { params: { populate: 'tags categories' } }).catch(this.showError)
    },
    moveUp (data) {
      this.learning_units[data.index].order -= 1.1
      this.saveReorder()
    },
    moveDown (data) {
      this.learning_units[data.index].order += 1.1
      this.saveReorder()
    },
    async saveReorder () {
      this.learning_units.sort((a, b) => a.order - b.order).forEach((learningUnit, index) => {
        this.learning_units[index].order = index
      })
      const ids = this.learning_units.map(learningUnit => {
        return { slug: learningUnit.slug, order: learningUnit.order }
      })
      await this.$axios.post('/api/learning_units/reorder', ids).then(() => {
        this.list()
      }).catch(this.showError)
    },
    remove (learningUnit) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/learning_units/' + learningUnit.slug).then(() => {
            this.list()
            this.$toast.success('Unidade de aprendizado removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
