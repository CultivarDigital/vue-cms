<template>
  <b-row class="learning-units-component pt-4">
    <b-col v-for="learning_unit in learningUnits" :key="learning_unit._id" md="4">
      <nuxt-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="learning_unit.pictures && learning_unit.pictures.length ? learning_unit.pictures[0].average : null" :alt="learning_unit.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ learning_unit.name }}</h3>
          </div>
          <div class="card-text">
            <p v-if="learning_unit.planting_time"><strong>Data do plantio:</strong>{{ learning_unit.planting_time }}</p>
            <p v-if="learning_unit.area_size"><strong>Área:</strong> {{ learning_unit.area_size }} hectares</p>
            <p v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates">
              <strong>Local:</strong>
              {{ learning_unit.address.location.coordinates[0] }}, {{ learning_unit.address.location.coordinates[1] }}
            </p>
            <p><br>{{ (learning_unit.description || learning_unit.content) | truncate(1000) }}</p>
            <br>
            <n-link class="btn btn-primary" :to="'/unidades-de-aprendizagem/' + learning_unit.slug">
              Saiba mais
            </n-link>
          </div>
        </div>
      </nuxt-link>
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
          .btn-primary
            background-color: #384e3f
            font-size: 12px
            text-transform: uppercase
            padding: 10px 15px
</style>
