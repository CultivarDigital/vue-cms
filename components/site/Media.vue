<template>
  <div class="medias-component">
    <div class="card">
      <div class="img">
        <div v-if="media.category === 'Vídeos' && media.oembed" class="card-img-top" v-html="media.oembed" />
        <b-img v-else :src="media.picture ? media.picture.average : null" :alt="media.title" class="card-img-top" />
      </div>
      <div class="card-body">
        <div class="pattern" />
        <div class="card-title">
          <h3>{{ media.title }}</h3>
          <small>Publicado em: {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }} em <n-link :to="'/biblioteca?categoria=' + media.categoria">{{ media.category }}</n-link></small>
        </div>
        <div class="card-text">
          <p v-if="media.description">{{ media.description }}</p>
          <small v-if="media.publishing_house">Editora/Fonte: {{ media.publishing_house }}<br><br></small>
          <small v-if="media.pdf"><b-button :to="media.pdf.url" target="_blank" variant="primary">Baixar arquivo</b-button><br><br></small>
          <small v-else-if="media.category !== 'Notícias' && media.category !== 'Vídeos' && media.url"><b-button :href="media.url" target="_blank" variant="primary">Baixar arquivo</b-button><br><br></small>
          <div class="tags-component">
            <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm">
              {{ tag }}
            </b-button>
          </div>
          <share />
        </div>
      </div>
    </div>
    <div class="text-center">
      <b-button variant="primary" @click="$router.go(-1)">
        Voltar à biblioteca
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
