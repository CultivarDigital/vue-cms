<template>
  <b-container class="villages-component pt-4">
    <b-row>
      <b-col v-for="village in villages" :key="village._id" lg="3" sm="6">
        <b-card v-b-modal="'modal-' + village._id" no-body>
          <div class="img">
            <b-card-img :src="defaultPicture(village.pictures).average" :alt="village.name" />
          </div>
          <b-card-body>
            <b-card-text>
              <div class="icon">
                <b-icon-image />
                <village :village="village" />
              </div>
              <h3 class="mt-4">{{ village.name }}</h3>
              <p v-if="village.description">{{ village.description }}</p>
            </b-card-text>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Village from '@/components/site/Village'
export default {
  components: {
    Village
  },
  props: {
    villages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    defaultPicture(pictures) {
      if (pictures) {
        return pictures.find(picture => picture.default) || pictures[0]
      }
      return {}
    }
  }
}
</script>
<style lang="sass">
  .villages-component
    .row
      margin-left: -5px
      margin-right: -5px
      .col-lg-3, .col-sm-6
        padding-left: 5px
        padding-right: 5px
    .card
      border: none
      color: #2A114B
      text-align: center
      background-color: #f5e7c5
      margin-bottom: 15px
      border-radius: 15px
      .img
        max-height: 11vw
        overflow-y: hidden
        @media (max-width: 992px)
          max-height: 19vw
        @media (max-width: 576px)
          max-height: 30vw
      .card-img
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-text
        height: 60px
        overflow-y: hidden
        .icon
          background-color: #2A114B
          border-radius: 100%
          width: 80px
          height: 80px
          display: flex
          align-items: center
          justify-content: center
          position: absolute
          left: 0
          right: 0
          margin: auto
          margin-top: -60px
          color: #fff
          font-size: 25px
        h3
          font-size: 24px
          height: 60px
          color: #2A114B
        p
          font-family: 'Titillium Web', sans-serif
</style>
