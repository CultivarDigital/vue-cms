<template>
  <div class="grupos-de-mulheres-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <page-info :page="page" />
      <b-container>
        <WomenGroups :women-groups="women_groups" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'women_groups',
      page_title: 'Grupos de mulheres',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Grupos de mulheres', active: true }
      ]
    }
  },
  computed: {
    women_groups () {
      let womenGroups = this.site.women_groups
      if (this.$route.query.tag) {
        womenGroups = womenGroups.filter(womenGroup => {
          return womenGroup.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return womenGroups
    }
  }
}
</script>
