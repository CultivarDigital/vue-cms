<template>
  <div class="mapa-page">
    <section class="content pb-5">
      <b-container>
        <br>
        <div class="mt-4 mb-5 text-center">
          <h1 class="title">Mapa de semeadura direta para restauração ecológica no Brasil</h1>
          <p>Confira onde o método já está presente no país e áreas de plantios que você pode visitar</p>
        </div>
      </b-container>
      <b-container fluid>
        <Map variant="vertical" />
      </b-container>
      <b-container>
        <br>
        <div class="mt-4 mb-5 text-center">
          <b-button variant="primary" @click="showMore = !showMore">
            Saiba mais
          </b-button>
        </div>
        <div v-if="showMore" class="show-more">
          <p>Um dos principais objetivos da <strong>Iniciativa Caminhos da Semente</strong> é o de difundir informaçõe acerca do método  para público mais amplo e, por isso, criamos o <strong>Mapa da Semeadura Direta.</strong></p>
          <p>Essa ferramenta apresenta a distribuição geográfica do método por meio da localização dos plantios e, para as áreas que compõem a <strong>Rede de Unidades de Aprendizagem da Semeadura Direta</strong> – chamadas UAs, também disponibilizamos dados técnicos das diferentes etapas de sua implementação (mistura de sementes, diagnóstico, planejamento, plantio, manejo e monitoramento). Algumas de nossas UAs possibilitam o agendamento para visitas técnicas; basta clicar na UA mais próxima de sua região e conferir os contatos disponíveis.</p>
          <p>O Mapa também conta com outras informações essenciais para quem tem interesse em implantar áreas com o método, como redes de coleta e comercialização de sementes nativas e organizações prestadoras de serviços relacionados com o método de semeadura direta para a <strong>restauração ecológica</strong>.</p>
          <p>Assim, ele conta com quatro principais grupos de informações:</p>
          <ul>
            <li><strong>Áreas de Semeadura Direta</strong>: informações gerais contendo município, área, idade do plantio;</li>
            <li><strong>Unidades de Aprendizagem (UAs)</strong>: informações de contato dos responsáveis, dados completos do plantio e períodos de visitação;</li>
            <li><strong>Redes de sementes nativas</strong>: contatos e outras informações disponíveis para compra de sementes;</li>
            <li><strong>Prestadores de serviços</strong>: organizações e pessoas que prestam serviços relacionados com a semeadura direta.</li>
          </ul>
          <p>Todos os dados e informações são inseridos por organizações e atores parceiros da Iniciativa que visam favorecer as trocas de experiências para apoiar a expansão da restauração ecológica por meio do método de semeadura direta.</p>
          <p>Se você possui área restaurada com semeadura direta, vende sementes nativas ou presta serviços ambientais relacionados com o método, <n-link to="/conta"><strong>cadastre-se</strong></n-link> no nosso Mapa da Semeadura Direta e <n-link to="/conta"><strong>faça parte dessa rede!</strong></n-link></p>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import mixinPage from '@/mixins/page'
import Map from '@/components/site/Map'
export default {
  components: {
    Map
  },
  mixins: [mixinPage],
  data () {
    return {
      showMore: false
    }
  },
  head () {
    return {
      title: 'Mapa de semeadura direta para restauração ecológica no Brasil - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: 'Confira onde o método já está presente no país e áreas de plantios que você pode visitar' }
      ]
    }
  }
}
</script>
<style lang="sass">
  .mapa-page
    .content
      .title
        font-size: 22px
        font-weight: bold
</style>
