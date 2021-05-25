<template>
  <div class="medias-component">
    <div class="card">
      <div v-if="media.category === 'Vídeos' && media.oembed && media.picture" class="img">
        <div v-if="media.category === 'Vídeos' && media.oembed" class="card-img-top" v-html="media.oembed" />
        <b-img v-else :src="media.picture ? media.picture.average : null" :alt="media.title" class="card-img-top" />
      </div>
      <div class="card-body">
        <div>
          <h3>{{ media.title }}</h3>
          <small>Publicado em: {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }} em <n-link :to="'/biblioteca?categoria=' + media.category">{{ media.category }}</n-link></small>
          <p v-if="media.description" class="mt-3">{{ media.description }}</p>
          <p v-if="media.publishing_house">
            Editora/Fonte: {{ media.publishing_house }}
          </p>
          <p v-if="media.category !== 'Notícias' && media.category !== 'Vídeos'">
            <b-button v-if="media.url" :href="media.url" target="_blank" variant="secondary">Baixar arquivo</b-button>
            <Documents :documents="media.documents" label="Baixar documentos" />
          </p>
          <div class="tags-component">
            <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm">
              {{ tag }}
            </b-button>
          </div>
          <share />
        </div>
      </div>
    </div>

    <br>
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
