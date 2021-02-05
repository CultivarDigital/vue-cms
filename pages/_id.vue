<template>
  <Page :id="$route.params.id" />
</template>
<script>
import Page from '@/components/site/Page'
export default {
  components: {
    Page
  }
}
</script>
