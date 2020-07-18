<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'auth'
}
</script>
