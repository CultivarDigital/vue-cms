<template>
  <b-container class="projects-component pt-4">
    <div v-for="project in projects" :key="project._id" md="4">
      <b-card no-body img-top>
        <div class="img">
          <b-card-img :src="project.pictures && project.pictures.length ? project.pictures[0].average : null" :alt="project.name" />
        </div>
        <b-card-body>
          <b-card-title>
            <h3>{{ project.name }}</h3>
          </b-card-title>
          <b-card-text>
            {{ project.description | truncate(1000) }}
            <br>
            <br>
            <!-- <tags :tags="project.tags" @click="filter" /> -->
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
  </b-container>
</template>

<script>
// import Tags from '@/components/site/Tags'
export default {
  // components: {
  //   Tags
  // },
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    filter(tag) {
      this.$router.push(this.$route.path + '?tag=' + tag.slug)
    }
  }
}
</script>
<style lang="sass">
  .projects-component
    .card
      border: none
      color: #722b1d
      background-color: #f5e7c5
      margin-bottom: 15px
      border-radius: 15px
      .img
        overflow-y: hidden
      .card-img
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-title
        height: 48px
        background-color: #2A114B
        padding: 10px 20px
        margin: -20px
        margin-bottom: 20px
        h3
          color: #fff
          font-size: 24px
          height: 24px
          overflow-y: hidden
      .card-text
        font-size: 13px
        font-family: 'Titillium Web', sans-serif
        .tags-component
          .btn
            background-color: #722b1d
            border-color: #722b1d
            color: #f5e7c5
            width: auto
            margin: 5px 5px 0 0

</style>
