<template>
  <div class="medias-component">
    <div>
      <div v-if="(media.type.includes('Vídeo') || media.type.includes('Áudio')) && media.oembed" v-html="media.oembed" />
      <Banners v-else-if="media.image" :items="[media.image]" />
      <div>
        <b-badge v-if="media.type">{{ media.type }}</b-badge>
        <h3 class="mt-3">{{ media.title }}</h3>
        <small>
          Publicado em: {{ $moment(media.publishing_date).format(media.publishing_date_format || "DD/MM/YYYY") }} em
        </small>
        <b-badge v-for="category in media.categories" :key="category" class="mb-1 mr-1" variant="primary" :to="'/biblioteca?categoria=' + category"><strong><small>{{ category }}</small></strong></b-badge>
        <p v-if="media.description" class="mt-3">{{ media.description }}</p>
        <p v-if="media.authors && media.authors.length">
          Autores: <strong>{{ media.authors.map(author => author.first_name + ' ' + author.last_name ).join(', ') }}</strong>
        </p>
        <p v-if="media.organizers && media.organizers.length">
          Organizadores: <strong>{{ media.organizers.map(organizer => organizer.first_name + ' ' + organizer.last_name ).join(', ') }}</strong>
        </p>
        <p v-if="media.publishing_house">
          Editora/Fonte: <strong>{{ media.publishing_house }}</strong>
        </p>
        <p v-if="media.number">
          Número da publicação: <strong>{{ media.number }}</strong>
        </p>
        <p v-if="media.pages">
          Páginas: <strong>{{ media.pages }}</strong>
        </p>
        <p v-if="media.source">
          Fonte: <strong>{{ media.source }}</strong>
        </p>
        <p v-if="media.volume">
          Volume: <strong>{{ media.volume }}</strong>
        </p>
        <!-- <p v-if="media.notes">
          Anotações: <strong>{{ media.notes }}</strong>
        </p> -->
        <p v-if="media.languages && media.languages.length">
          Idiomas: <strong>{{ media.languages.join(', ') }}</strong>
        </p>
        <p v-if="media.institution">
          Instituição: <strong>{{ media.institution }}</strong>
        </p>
        <p v-if="media.city">
          Cidade: <strong>{{ media.city }}</strong>
        </p>
        <p v-if="media.doi">
          DOI: <strong>{{ media.doi }}</strong>
        </p>
        <p v-for="info in media.aditional_infos" :key="info.label">
          {{ info.label }} <strong>{{ info.value }}</strong>
        </p>
        <p v-if="media.patent_legal_status">
          Disponibilidade: <strong>{{ media.patent_legal_status }}</strong>
        </p>
        <b-button v-if="media.url" :href="media.url" target="_blank" variant="primary">Fonte</b-button>
        <Documents :documents="media.docs" label="Baixar documentos" />
        <div class="tags-component">
          <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm" class="mr-1">
            {{ tag }}
          </b-button>
        </div>
        <share />
      </div>
    </div>
    <br>
    <div class="text-center">
      <b-button variant="secondary" @click="$router.go(-1)">
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
