<template>
  <div class="species-page">
    <divisor variant="white-down" />
    <b-carousel :indicators="false" class="banners">
      <b-carousel-slide img-src="~assets/img/banner_biblioteca.png">
        <h2>Lista de espécies</h2>
        <p>Espécies para semeadura direta na Amazônia, Cerrado e Mata Atlântica</p>
      </b-carousel-slide>
    </b-carousel>
    <divisor variant="orange-up" />
    <section class="content pb-5">
      <b-container>
        <div class="pt-5">
          <div class="pattern" />
          <div class="title">
            <h3>ESPÉCIES PARA SEMEADURA DIRETA</h3>
            <p>Características de sementes e plantas, sugestões de coleta, processamento e plantio</p>
          </div>
          <div>
            <div class="specie-info">
              <div class="name" @click="toggleTabs(0)">
                O QUE É A LISTA DE ESPÉCIES
              </div>
              <div v-if="currentTab == 0" class="info">
                <p>O presente estudo traz uma lista de espécies e suas características mais relevantes para a restauração de ecossistemas por meio da semeadura direta. São apresentadas 441 espécies que podem ser plantadas nos diferentes tipos de vegetação dos biomas Amazônia, Cerrado e Mata Atlântica. As espécies apresentadas foram testadas em semeadura direta e/ou são disponibilizadas pelas redes de sementes em atividade no Brasil. (1)</p>
                <p>A lista foi desenvolvida colaborativamente, em diversos encontros e contribuições online, por um grupo de especialistas em restauração ecológica, ecologia e tecnologia de sementes que inclui coletores de sementes, pesquisadores e técnicos dessas áreas. Inicialmente, foram elencadas e organizadas as informações disponíveis nas plataformas de consulta on-line, como WebAmbiente (<a href="https://www.webambiente.gov.br/" target="_blank">https://www.webambiente.gov.br</a>), Flora do Brasil (<a href="http://floradobrasil.jbrj.gov.br" target="_blank">http://floradobrasil.jbrj.gov.br</a>), e também em revisões bibliográficas. A partir da planilha base, foram realizados encontros e entrevistas com os especialistas para o preenchimento e confirmação de informações sobre características importantes para a multiplicação das espécies da lista. Essa é a primeira versão e temos intenção de melhorá-la em novas versões.</p>
                <p>A lista está subdividida em duas partes. Na primeira, são disponibilizadas espécies cuja porcentagem de estabelecimento em campo foi quantificada sistematicamente em pelo menos uma área de semeadura direta, em alguma região do país (LISTA 1). A segunda parte traz espécies que vêm sendo utilizadas em plantios de semeadura direta, mas cuja porcentagem de estabelecimento em campo não foi ainda quantificada sistematicamente (LISTA 2). Para estas espécies, há apenas estimativas de restauradores sobre o sucesso de estabelecimento.</p>
                <p>As fontes bibliográficas ou os especialistas que forneceram informações sobre as espécies e suas características são referenciados na lista e sua citação está disponibilizada ao final da publicação (ÍNDICE DE FONTES DAS INFORMAÇÕES). Com isso, o usuário pode encontrar a fonte original da informação, na literatura ou no conhecimento empírico do especialista. Mais espécies e características relevantes para a semeadura direta estão sendo revelados continuamente, à medida em que crescem os projetos de restauração com o método em diferentes ecossistemas. Portanto, a lista deverá ser atualizada em novas versões, contribuindo para que o método tenha efetividade e com mais espécies.</p>
                <p>Incentivamos que pesquisadores, técnicos, coletores e plantadores continuem experimentando e contribuam para o enriquecimento da lista. Se você deseja contribuir com o estudo, informação nova ou correções, entre em contato pelo e-mail <a href="mailto:caminhosdasemente@agroicone.com.br">caminhosdasemente@agroicone.com.br</a>. Visamos também estimular pesquisas com espécies ainda pouco utilizadas e/ou com poucos dados disponíveis. Será um prazer ter você neste grupo!</p>
                <p><small>(1) Rede de Sementes do Xingu, Rede de Sementes do Cerrado, Rede de Sementes do Vale do Ribeira, Rede de Sementes do Portal da Amazônia, Rede de Sementes Nascentes Geraizeiras, Programa Arboretum.</small></p>
              </div>
            </div>
            <div class="specie-info">
              <div class="name" @click="toggleTabs(1)">
                A SEMEADURA DIRETA
              </div>
              <div v-if="currentTab == 1" class="info">
                <p>O método de se plantar sementes de espécies nativas e agrícolas diretamente no solo, sem passar pela etapa do viveiro de mudas, é conhecido como semeadura direta. As sementes podem ser plantadas em covas, em linhas ou a lanço, como qualquer semente agrícola ou de pastagem.</p>
                <p><strong>A composição de espécies para semeadura direta de formações florestais</strong> deve conter diversas espécies de todas as fases sucessionais, necessárias para manter o desenvolvimento estrutural ao longo do tempo, preferencialmente em alta densidade, para evitar o retrocesso ou estagnação com plantas exóticas ou solo exposto. Apresentamos duas classificações interessantes para restauração ecológica: seis classes de <strong>"longevidade"</strong>, estimando o tempo de vida da planta após a germinação; e duas “estratégias de ocupação”, <strong>diversidade</strong> e <strong>recobrimento</strong>, descritas a seguir.</p>
                <p>Considerando as classes de longevidade, a primeira fase sucessional que a “muvuca” deve conter consiste de espécies herbáceas e arbustivas nativas, agrícolas e/ou de adubação verde capazes de cobrir o solo rápido e permanecer durante os primeiros <strong>6 meses</strong> após o plantio, como feijão-de-porco (Canavalia ensiformis), abóbora (Cucurbita spp.) e milho (Zea mays).</p>
                <p>As espécies da segunda fase sucessional devem substituir as da primeira fase na cobertura do solo e permanecer até aproximadamente <strong>3 anos</strong>, como feijão-guandu (Cajanus cajan), fedegosão (Senna alata), maracujá (Passiflora spp.), assa-peixe (Vernonanthura polyanthes).</p>
                <p>A terceira fase sucessional da muvuca é a que contém a maior parte das espécies de árvores classificadas como pioneiras ou de recobrimento em projetos de restauração florestal. São as espécies arbóreas capazes de substituir as espécies da fase anterior, formadas principalmente por arbustos semi-perenes que dominam a cobertura vegetal rapidamente. Entretanto, elas geralmente têm um tempo de vida mais curto, de até aproximadamente <strong>10 anos</strong>, quando já começam a morrer em ambiente florestal denso, como por exemplo: lobeira (Solanum lycocarpum), urucum (Bixa orellana), crindiúva (Trema micrantha) e caju (Anacardium occidentale).</p>
                <p>A quarta fase sucessional consiste em espécies que vão dominar a cobertura de copa entre <strong>10 e 20 anos</strong>, por exemplo: algodoeiro (Heliocarpus popayanensis), carvoeiro (Tachigali subvelutina), ingá (Inga vera), muricis (Byrsonima cydoniifolia), mamoninha (Mabea fistulifera) e mutamba (Guazuma ulmifolia).</p>
                <p>A quinta e a sexta fases sucessionais contém aquelas espécies classificadas como espécies secundárias-tardias e clímaces, que manterão a estrutura florestal, respectivamente, por <strong>20 a 100 anos</strong> e <strong>mais de 100 anos</strong>, como, tamboril (Enterolobium contortisiliquum) e angicos (Anadenanthera sp) na quinta fase, e na sexta fase: jatobá (Hymenaea courbaril), aroeira (Astronium urundeuva), gonçalo alves (Astronium fraxinifolium), copaíba (Copaifera sp.), etc.</p>
                <p>Esse tempo de cobertura vegetal nativa em alta densidade e em contínua substituição, com a dominância do dossel passando por essas fases, associado a uma riqueza razoável de cada uma delas, deve ser capaz de permitir que a estrutura florestal cresça e se complexifique em nichos para colonização por outras espécies nativas não plantadas.</p>
                <p><strong>A composição de espécies de formações savânicas</strong> deve considerar ervas e subarbustos que cobrem o solo nos primeiros <strong>12 meses</strong> (ex.: capim-andropogon (Andropogon fastigiatus), estilosantes (Stylosanthes sp.), amargoso (Lepidaploa aurea), espécies de ervas e arbustos que cobrem o solo nos primeiros <strong>3 anos</strong> (ex.: rabo-de-raposa (Aristida spp), capim-roxo (Schizachyrium sanguineum), capim-fiapo (Trachypogon spicatus), casiruba (Senna rugosa), assa-peixe (Vernonanthura spp.), e grande diversidade de espécies de ervas, arbustos e árvores perenes, que dominam e estruturam a vegetação a partir dos <strong>4 anos</strong> em diante (ex.:  arbustos carobinha (Jacaranda ulei) e bolsa-de-pastor (Zeyheria montana), capins capim-flexinha (Echinolaena inflexa) e brinco-de-princesa (Loudetiopsis chrysothrix), e árvores jacarandá-do-campo (Machaerium opacum) e carvoeiro (Tachigali vulgaris).</p>
                <p>A semeadura direta proporciona alta densidade de plantas desde o primeiro ano de plantio, contemplando classes sucessionais que antecedem as árvores pioneiras. No caso das savanas, a semeadura direta contempla ervas e arbustos que estruturam a vegetação.</p>
                <p>Para os plantios mecanizado ou manual a lanço é necessária uma gradagem niveladora leve com a grade fechada para incorporação das sementes no solo à profundidade média de 3 cm. Para plantios em linhas pode ser utilizada qualquer plantadeira de plantio direto de grãos, sulcador florestal com caixa de adubo ou manualmente e combinado com plantio de mudas, em covetas ou covas e utilizando matraca de sementes. Em áreas muito declivosas, muito pequenas ou inacessíveis a máquinas, recomendam-se as técnicas manuais. Além dos métodos de semeadura mais comuns para florestas e savanas, a semeadura direta pode ser utilizada para adensar e enriquecer a vegetação.</p>
                <p>A semeadura direta pode resultar em porcentagens de estabelecimento de plantas bastante variáveis, devido especialmente à qualidade do lote de sementes, à quebra de dormência, à regularidade das chuvas após o plantio, à predação de sementes, herbivoria e à profundidade de semeadura. Com esta variabilidade, é possível que o restaurador semeie com segurança. De forma geral, a porcentagem de estabelecimento de árvores é de 20%, mas a variação entre espécies é muito alta. Há espécies com &lt;1% de estabelecimento até 80%, conforme será verificado na lista. Isto, juntamente com o preço das sementes, deve ser considerado ao calcular a quantidade de sementes semeadas.</p>
                <p>Além dos processos ecológicos simulados pela semeadura direta, ela consegue envolver diversos atores da cadeia da restauração ecológica, gerando renda para coletores e coletoras de sementes que são os principais fornecedores para os plantios que demandam grandes quantidades de sementes nativas.</p>
              </div>
            </div>
            <div class="specie-info">
              <div class="name" @click="toggleTabs(2)">
                COMO USAR A LISTA
              </div>
              <div v-if="currentTab == 2" class="info">
                <p>A lista apresenta cada espécie em uma linha e, por coluna, informações dessas espécies. A planilha completa analisada têm mais de 800 espécies e contempla outros “campos” de informação dos quais, entretanto, encontra-se menos informações. A planilha está disponível no site <a href="https://www.caminhosdasemente.org.br/" target="_blank">https://www.caminhosdasemente.org.br</a>. A publicação apresenta informações sobre (i) longevidade e categoria sucessional das plantas, pois esta característica é bastante correlacionada com a fase da restauração mencionada acima; (ii) fitofisionomias, pois em cada uma ocorrem espécies diferentes; (iii) quantidade de sementes por kg, tipo de conservação das sementes, faixa de porcentagem (%) de estabelecimento em campo, dicas de coleta, manejo e armazenamento das sementes, dicas de plantio das espécies via semeadura direta, pois estas informações serão úteis aos restauradores e coletores de sementes.</p>
              </div>
            </div>
            <div class="specie-info">
              <div class="name" @click="toggleTabs(3)">
                INFORMAÇÕES ESPECÍFICAS APRESENTADAS NA LISTA
              </div>
              <div v-if="currentTab == 3" class="info">
                <p>
                  <strong>Classe de estabelecimento em campo (%):</strong> espécies foram classificadas em faixas de porcentagens de estabelecimento <i>((plantas estabelecidas % sementes plantadas) x 100)</i> em classes. Utiliza pelo menos um resultado de estabelecimento observado em semeadura direta. Quando foi encontrado mais de um resultado, calculou-se a média (espécies da Tabela 1). Espécies em que há apenas suposição da classe de estabelecimento, a partir de experiências de campo não quantificadas sistematicamente, estão listadas na Tabela 2. É claro que para a definição de espécies a serem utilizadas em semeadura direta, a porcentagem de estabelecimento deve ser olhada conjuntamente com o preço da semente no mercado regional. Estimar por espécie o custo de cada planta jovem estabelecida no projeto por mudas ou por semeadura direta é essencial para se escolher a melhor forma de plantio para cada espécie. Para tanto, aqui faltam os preços de sementes e mudas e esses são difíceis de apresentar pois variam muito em cada trecho do país.
                </p>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Muito Baixa</th>
                      <th>Baixa</th>
                      <th>Média</th>
                      <th>Alta</th>
                      <th>Muito Alta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>&lt; 10 %</td>
                      <td>10 a 19 %</td>
                      <td>20 a 39 %</td>
                      <td>40 a 59 %</td>
                      <td>&gt; 60 %</td>
                    </tr>
                  </tbody>
                </table>
                <p><strong>Hábito:</strong> Forma de vida da planta na fase adulta: trepadeiras, ervas (palmeiras), subarbustos, arbustos e árvores.</p>
                <p><strong>Longevidade:</strong> Tempo de vida da planta após a germinação (estimado em anos). Nas tabelas, os nomes das espécies estão destacados nas cores referentes a essa classe, que representa o tempo de vida das plantas:</p>
                <table class="table">
                  <tbody>
                    <tr>
                      <td>0 - 6 meses</td>
                      <td>até 3 anos</td>
                      <td>até 10 anos</td>
                      <td>até 20 anos</td>
                      <td>até 100 anos</td>
                      <td>> 100 anos</td>
                    </tr>
                  </tbody>
                </table>
                <p><strong>Conservação das sementes:</strong> Indica a tolerância à secagem para o armazenamento das sementes:</p>
                <p><i><u>Ortodoxas:</u></i> São sementes que toleram secagem forçada e que podem permanecer viáveis durante longos períodos de armazenamento em temperaturas muito baixas. Suportam armazenamento em recipientes de papelão, garrafas pets, sacos plásticos e de papel fechados em temperatura abaixo de 0oC, mantendo-se viáveis por mais de 1 ano. Exemplos: Jatobá (Hymenaea spp.), Angico (Anadenanthera spp.), Caju (Anacardium occidentale), Tamboril (Enterolobium spp.).</p>
                <p><i><u>Recalcitrantes:</u></i> Sementes que não sobrevivem à secagem, nem ao congelamento, o que inviabiliza muitas vezes seu armazenamento, embora hajam exemplos promissores no armazenamento de sementes recalcitrantes. A coletora e pesquisadora Milene Alves, orientada pela Dra Beatriz Marimon na Unemat em Nova Xavantina, , as verificou que sementes do buriti (Mauritia flexuosa) armazenados por 6 meses em sacos de cebola (vazados) dentro de cursos de água corrente, mantiveram seu vigor. Este manejo já era utilizado por povos indígenas e agricultores familiares da região. Em geral, a semeadura dessas espécies deve ser realizada logo após a colheita. Na semeadura direta é possível utilizar espécies que frutificam durante a época de plantio. Para utilizar um número maior de espécies desse grupo, recomenda-se proceder à produção de mudas. Exemplos: Abiu (Pouteria spp.), Ingá (Inga spp.), Mangaba (Hancornia speciosa), Jaboticaba (Myrciaria spp.).<p>
                <p><i><u>Intermediárias:</u></i> Sementes que podem ser armazenadas por pouco tempo, sendo uma classe intermediária entre as ortodoxas e recalcitrantes. Recomenda-se temperaturas amenas, entre 15 e 20oC, sem secagem forçada, para serem armazenadas apenas durante o período entre a coleta e a semeadura no mesmo ano. Para utilizar um número maior de espécies desse grupo, recomenda-se proceder à produção de mudas. Exemplos: Guanandi (Callophyllum brasiliense), Angelim-morcegueira (Andira spp.) e Bacupari (Garcinia gardneriana).</p>
                <p><strong>Tipo de vegetação:</strong> Fitofisionomia em que as espécies ocorrem naturalmente e/ou onde podem ser plantadas com a finalidade de restauração ecológica, tendo como base as informações disponíveis no site Flora do Brasil e WebAmbiente.</p>
                <p>
                  <strong>Estratégia de ocupação:</strong> Classificação utilizada em projetos de restauração florestal, que ressalta as espécies arbóreas de Recobrimento em cada tipo de vegetação florestal: aquelas que possuem crescimento rápido e que formam uma boa cobertura (sombreamento do solo) reduzindo a luz para espécies invasoras heliófitas, como a braquiária e outros capins. Equivale a algumas espécies da terceira e quarta classes de “tempo de vida”, aqui também apresentadas. As espécies de recobrimento são substituídas pelas de Diversidade, que são todas as demais que possuem um crescimento mais lento ou sombra menos densa, mas que também devem ser plantadas com densidade e diversidade suficientes para a permanência da vegetação de maneira definitiva, após a morte das espécies de recobrimento. Para formações de campo nativo, espécies estão sendo classificadas como de Recobrimento tardio, como gramíneas nativas que cobrem o solo bastante, mas apenas após a primeiro ano pós plantio.
                </p>
                <p><strong>Número de sementes/kg:</strong> Quantidade mínima de sementes por kg de sementes.</p>
                <p><strong>Coleta:</strong> Dicas para planejar e realizar a coleta de sementes, como cores dos frutos no ponto de coleta, equipamentos auxiliares e métodos de coleta.</p>
                <p><strong>Manejo das sementes:</strong> Dicas para extrair as sementes dos frutos, cuidados para realizar a secagem e dificuldades que podem ser encontradas para realizar o beneficiamento.</p>
                <p><strong>Armazenamento:</strong> Dicas para armazenar as sementes, como o tipo de recipiente, temperatura ideal, e o tempo máximo de armazenamento.</p>
                <p><strong>Plantio:</strong> Dicas para realizar o plantio das sementes pelo método de semeadura direta.</p>
              </div>
            </div>
            <div class="specie-info">
              <div class="name" @click="toggleTabs(4)">
                AUTORES
              </div>
              <div v-if="currentTab == 4" class="info">
                <p><strong>Edézio Miranda</strong> - Iniciativa Caminhos da Semente</p>
                <p><strong>Eduardo Malta</strong> - Instituto Socioambiental</p>
                <p><strong>Daniel Luis Mascia Vieira</strong> - EMBRAPA Recursos Genéticos e Biotecnologia</p>
                <p><strong>Gustavo Rocha</strong> - Iniciativa Caminhos da Semente</p>
                <p><strong>Maxmiller Ferreira</strong> - Iniciativa Caminhos da Semente</p>
                <p><strong>Barbara Pachêco</strong> - CEO & Founder e coletora na VerdeNovo Sementes Nativas</p>
                <p><strong>Claudomiro de Almeida Cortes</strong> - Presidente e coletor da Associação Cerrado de Pé</p>
                <p><strong>José Severino da Silva</strong> - Coletor de Sementes</p>
                <p><strong>Camila Prado Motta</strong> - Presidente da Rede de Sementes do Cerrado</p>
                <p><strong>Maria Eduarda Camargo</strong> - Assistente técnica da Rede de Sementes do Cerrado</p>
                <p><strong>Marcelo Kuhlmann</strong> - Assessor Técnico – Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)</p>
                <p><strong>Lara Aranha da Costa</strong> - Técnica em Restauração Florestal na Rede de Sementes do Xingu</p>
                <p><strong>Guilherme Henrique Pompiano do Carmo</strong> - Técnico em Restauração Florestal na Rede de Sementes do Xingu</p>
                <p><strong>Cassiano Marmet</strong> - Xingu Consultoria Ambiental (XICA)</p>
                <p><strong>Milene Alves Oliveira</strong> - Gestora do grupo de coleta de Nova Xavantina-MT da Associação Rede de Sementes do Xingu</p>
                <p><strong>Ingo Isernhagen</strong> - Pesquisador Embrapa Agrossilvipastoril</p>
                <p><strong>Fatima Conceição Márquez Piña-Rodrigues</strong> - Professora e pesquisadora na Universidade Federal de São Carlos (UFSCAR), Campus Sorocaba-SP</p>
                <p><strong>Lausanne Soraya de Almeida</strong> - Doutoranda Universidade Federal de São Carlos (UFSCAR), Campus Sorocaba-SP</p>
                <p><strong>Talita Jardim do Nascimento</strong> - Graduanda em Engenharia Ambiental e Sanitária do Instituto Federal de Minas Gerais (IFMG), Campus Governador Valadares</p>
                <p><strong>Gabriel Perussi</strong> - Graduando em Ciências Biológicas Universidade Federal de São Carlos (UFSCAR), Campus Sorocaba-SP</p>
                <p><strong>Daniela Graciano Assi</strong> - Graduanda em Ciências Biológicas Universidade Federal de São Carlos (UFSCAR), Campus Sorocaba-SP</p>
                <p><strong>Natália Coelho Barbosa Albuquerque</strong> - Coordenadora Técnica Executiva CDFS – Programa Arboretum de Conservação e Restauração da Diversidade Florestal/ Serviço Florestal Brasileiro – MAPA</p>
                <p><strong>Carlos Eduardo Moraes</strong> - Consultor LASF/CDFS (Programa Arboretum de Conservação e Restauração da Diversidade Florestal) </p>
                <p><strong>Renata Lopes Carvalho Barros</strong> - Engenheira Agrônoma CDFS (Programa Arboretum de Conservação e Restauração da Diversidade Florestal)</p>
                <p><strong>Marina Rosa de Souza</strong> - Assistente LASF/CDFS – Programa Arboretum de Conservação e Restauração da Diversidade Floresta</p>
                <p><strong>Alexandre Bonesso Sampaio</strong> - ICMBIO</p>
                <p><strong>José Felipe Ribeiro</strong> - Pesquisador Embrapa Cerrados</p>
                <p><strong>Juliana Muller Freire</strong> - Pesquisadora Embrapa Agrobiologia</p>
                <p><strong>Anderson Rogério Lopes</strong> - Coordenador da Rede de Sementes do Portal da Amazônia – RSPA</p>
                <p><strong>Ricardo Ribeiro Rodrigues</strong> - Professor e pesquisador ESALQ-USP</p>
                <p><strong>Júlia Barbosa de Paiva</strong> - Mestranda ESALQ-USP</p>
                <p><strong>Cristina Yuri Vidal</strong> - Biologa, Doutora em Biologia Vegetal (UNICAMP)</p>
                <p><strong>André Gustavo Nave</strong> - Diretor Bioflora Tecnologia da Restauração</p>
                <p><strong>Nicole de Sousa</strong> - Estagiária Agroicone</p>
                <p><strong>Rafael de Souza Silva</strong> - Estagiário Agroicone</p>
              </div>
            </div>
            <b-button block variant="primary" to="/lista-de-especies">Acessar a lista de espécies</b-button>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  mixins: [mixinGlobal],
  data() {
    return {
      currentTab: 0
    }
  },
  methods: {
    toggleTabs(tab) {
      if (this.currentTab === tab) {
        this.currentTab = null
      } else {
        this.currentTab = tab
      }
    }
  },
  head() {
    return {
      title: 'Espécies para semeadura direta na Amazônia, Cerrado e Mata Atlântica - ' + this.$store.state.site.name,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Características de sementes e plantas, sugestões de coleta, processamento e plantio'
      }]
    }
  }
}
</script>
<style lang="sass">
  .species-page
    .pattern
      width: 15px
      height: 25px
      background-color: #fff
      position: absolute
    .title
      margin-left: 30px
      margin-bottom: 20px
      h3
        color: #fff
        font-size: 24px
        font-weight: 700
        text-transform: uppercase
      p
        color: #384e3f
        font-size: 12px
        text-transform: uppercase
    .specie-info
      border: 1px solid #384e3f
      border-radius: 10px
      padding: 10px 15px
      font-size: 14px
      margin-bottom: 10px
      .name
        font-weight: bold
        font-size: 14px
        cursor: pointer
      .title
        border-bottom: 1px solid #fff
        padding-bottom: 10px
        margin: 0
        margin-top: 10px
      .info
        margin-top: 10px
        dt
          margin-top: 7px
          margin-bottom: 7px
          color: #fff

</style>
