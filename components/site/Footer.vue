<template>
  <div class="footer pt-5 pb-5">
    <footer v-if="site">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6">
            <small>&copy; 2013 Rede de Sementes do Xingu. Todos os direitos reservados.</small>
          </b-col>
          <b-col sm="6" class="text-right links">
            <a @click="show_contact = !show_contact">
              CONTATO
            </a>
            \
            <a @click="show_partners = !show_partners">
              PARCEIROS E APOIOS
            </a>
            <contact v-if="show_contact" />
            <partners v-if="show_partners" />
          </b-col>
        </b-row>
      </b-container>
    </footer>
    <!-- <div class="pb-5">
      <share />
    </div> -->
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
