<template>
  <span class="text-primary">
    <span v-if="total != null">
      <strong v-if="total === 0">Nenhum item encontrado</strong>
      <span v-else-if="total === 1"><strong>1</strong> item encontrado</span>
      <span v-else><strong>{{ total }}</strong> itens encontrados</span>
    </span>
    <span v-else>
      <b-spinner small /> Carregando...
    </span>
  </span>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: () => null
    }
  }
}
</script>
