<template>
  <b-row class="learning-units-component list-page">
    <b-col v-for="learning_unit in learningUnits" :key="learning_unit._id" md="4">
      <n-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="learning_unit.pictures && learning_unit.pictures.length ? learning_unit.pictures[0].average : null" :alt="learning_unit.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ learning_unit.name }}</h3>
          </div>
          <div class="card-text">
            <p v-if="learning_unit.description || learning_unit.content">{{ (learning_unit.description || learning_unit.content) | truncate(1000) }}<br><br></p>
            <p v-if="learning_unit.planting_time"><strong>Data do plantio:</strong>{{ learning_unit.planting_time }}</p>
            <p v-if="learning_unit.area_size"><strong>Área:</strong> {{ learning_unit.area_size }} hectares</p>
            <p v-if="learning_unit.address && (learning_unit.address.city || learning_unit.address.uf)">
              <strong>Local:</strong>
              {{ [learning_unit.address.city, learning_unit.address.uf].filter(i => i).join(' - ') }}
            </p>
            <br>
            <n-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" class="btn btn-primary">
              Saiba mais
            </n-link>
            <n-link to="/mapa" class="btn btn-default">
              Voltar ao mapa
            </n-link>
          </div>
        </div>
      </n-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    learningUnits: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="sass">
  .learning-units-component
    .card
      cursor: pointer
      border: none
      color: #757575
      background-color: #fff
      margin-bottom: 15px
      border-radius: 15px
      min-height: calc(100% - 15px)
      .img
        overflow-y: hidden
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
        @media (min-width: 768px)
          max-height: 17vw

      .card-body
        padding: 20px
        .card-title
          h3
            color: #fff
            background-color: #e0a15d
            font-size: 14px
            font-weight: 700
            border-radius: 5px
            padding: 5px 15px
            width: 100%
        .card-text
          font-size: 14px
          font-family: 'Titillium Web', sans-serif
          padding: 10px
          p
            margin: 0
            font-size: 12px
          h4
            color: #384e3f
            font-size: 14px
            font-weight: bold
            margin: 15px 0
</style>
