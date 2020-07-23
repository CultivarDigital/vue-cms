<template>
  <div>
    <b-carousel v-model="slide" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
      <b-carousel-slide caption="FLORESTA EM PÉ PARA GARANTIA DA VIDA DO POVO MẼBÊNGÔKRE" img-src="~/assets/img/banner-cultura.png"></b-carousel-slide>
      <b-carousel-slide caption="MONITORAMENTO AMBIENTAL E TERRITORIAL" img-src="~/assets/img/banner-monitoramento.png"></b-carousel-slide>
      <b-carousel-slide caption="ATIVIDADES PRODUTIVAS E GERAÇÃO DE RENDA" img-src="~/assets/img/banner-atividades.png"></b-carousel-slide>
      <b-carousel-slide caption="FORTALECIMENTO INSTITUCIONAL E POLÍTICO" img-src="~/assets/img/banner-politica.png"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {}
</script>
