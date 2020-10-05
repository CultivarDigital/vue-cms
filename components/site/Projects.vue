<template>
  <div class="projects-component pt-4 row">
    <div v-for="project in projects" :key="project._id" md="4">
      <n-link :to="'/projetos/' + project.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="project.pictures && project.pictures.length ? project.pictures[0].average : null" :alt="project.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ project.name }}</h3>
          </div>
          <div class="card-text">
            {{ (project.description || project.content) | truncate(1000) }}
            <br>
            <br>
            <tags :tags="project.tags" />
          </div>
        </div>
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
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
        border-radius: 0
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
        font-size: 14px
        font-family: 'Titillium Web', sans-serif
        .tags-component
          .btn
            background-color: #722b1d
            border-color: #722b1d
            color: #f5e7c5
            width: auto
            margin: 5px 5px 0 0

</style>
