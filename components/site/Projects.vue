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
