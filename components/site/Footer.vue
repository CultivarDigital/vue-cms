<template>
  <div class="footer pt-5 pb-5 bg-secondary">
    <footer v-if="site">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6">
            <a>
              PARCEIROS E APOIOS
            </a>
            <partners />
            <div class="mt-4">
              <small>&copy; 2013 Rede de Sementes do Xingu. Todos os direitos reservados.</small>
            </div>
          </b-col>
          <b-col sm="6" class="">
            <a>
              CONTATO
            </a>
            <contact />
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_contact: false,
      show_partners: false
    }
  },
  computed: {
    site() {
      return this.$store.state.site
    }
  }
}
</script>
