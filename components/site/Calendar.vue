<template>
  <v-calendar class="custom-calendar" locale="pt-BR" :attributes="event_list">
    <div slot="day-content" slot-scope="{ day, attributes }" class="flex flex-col h-full z-10 overflow-hidden">
      <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
      <div class="flex-grow">
        <p v-for="attr in attributes" :key="attr.key" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">
          <n-link :to="'/agenda/' + attr.customData._id">
            <b-badge pill variant="success">{{ attr.customData.title }}</b-badge>
          </n-link>
        </p>
      </div>
    </div>
  </v-calendar>
</template>
<script>
export default {
  props: {
    events: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      event_list: []
    }
  },
  created() {
    this.event_list = this.events.map(event => {
      const dates = { start: event.start_at }
      if (event.end_at) {
        dates.end = event.end_at
      } else {
        dates.end = event.start_at
      }
      return {
        customData: event,
        dates,
        key: event._id
      }
    })
  }
}
</script>
<style lang="sass">
  .custom-calendar
    $day-border: 1px solid #b8c2cc
    $day-border-highlight: 1px solid #b8c2cc
    $day-width: 90px
    $day-height: 90px
    $weekday-bg: #f8fafc
    $weekday-border: 1px solid #eaeaea
    width: 100%
    border-radius: 15px
    .vc-grid-container
      border-radius: 15px
    .vc-header
      background-color: #f1f5f8
      padding: 10px 0
    .vc-weeks
      padding: 0
    .vc-weekday
      background-color: $weekday-bg
      border-bottom: $weekday-border
      border-top: $weekday-border
      padding: 5px 0
    .vc-day
      padding: 0 5px 3px 5px
      text-align: left
      height: $day-height
      min-width: $day-width
      background-color: white

      &.weekday-1,
      &.weekday-7
        background-color: #eff8ff
      &:not(.on-bottom)
        border-bottom: $day-border
        &.weekday-1
          border-bottom: $day-border-highlight
      &:not(.on-right)
        border-right: $day-border
      .badge
        white-space: normal
        border-radius: 5px
        margin-top: 2px
        text-align: left
      .flex-grow
        overflow-y: auto
        max-height: 65px
    .vc-day-dots
      margin-bottom: 5px
</style>
