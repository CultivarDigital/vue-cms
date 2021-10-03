# VUE CMS

Um CMS básico para criação de sites de forma rápida mas com grande poder de customização

### Objetivo desse projeto

Este projeto nasceu da necessidade de criar sites de forma rápida com uma stack consistente e de fácil manutenção/personalização. A idéia é ter uma base pronta e bem estruturada e que permita que novas funcionalidades e mudanças na estrutura sejam feitas sem toda a complicação de CMS como o wordpress que é complexo por sua natureza generalista.

### Tecnologias utilizadas

Englobando todo o projeto está o Nuxt.js com alguns módulos da comunidade @nuxtjs como: 
- @nuxtjs/auth para a autenticação
- @nuxtjs/axios para requisições da API
- @nuxtjs/pwa para ativar recursos de Progressive Web Apps
- @nuxtjs/toast para exibir mensagens ao usuário
 
Compondo o lado do frontend está o Vue.js com algumas bibliotecas do seu ecossistema:
- BootstrapVue para os componentes de tela e criação do design
- Leaflet para renderizar os mapas
- vue-goodshare exibe os botões de compartilhamento
- moment para trabalhar com datas
- v-money adiciona máscaras de moedas nos inputs dos formulários
- vee-validate faz a validação dos dados nos formulários
- v-calendar nos dá um calendário personalizado e dinâmico
- vue-easy-lightbox cuida da apresentação das imagens em forma de galeria
- vue-quill-editor permite cadastrar textos formatados para a criação de páginas dinâmicas
- vue-the-mask adiciona mascaras nos inputs dos formulários (telefone, cpf, cnpj, etc...)
- vue2-datepicker adiciona um date picker nos inputs de data
- vue2-filters ajuda na formatação de dados como moedas, percentual, truncate...
- vuex-persistedstate guarda uma cópia do state localmente permitindo assim persistir o estado da aplicação

O lado servidor está construido em cima do Node.js e algumas de suas bibliotecas:
- Mongodb como banco de dados
- Express cuidada do fluxo da aplicação (sessão, rotas...).
- Mongoose faz a interface e estruturação do banco de dados
- Passport cuida da autenticação
- multer recebe e processa os uploads
- sharp gera as miniaturas das images enviadas
- pdf-image gera as miniaturas dos arquivos PDF enviados

### Funcionalidades básicas

- Autenticação (Login, Cadastro e CRUD de usuários)
- Níveis de usuário (Administrador e usuário comum)
- Painel administrativo para gerenciar os conteúdos
- Menu dinâmico
- Criação de páginas
- Página de notícias (Blog)
- Agenda/Eventos/Calendário 
- Biblioteca (Acervo)
- Loja (Fluxo básico de e-commerce com integração dos correios)

### Instruções de desenvolvimento

```bash
# Clone esse repositório
git clone git@github.com:squad-on/tekoa.git

# Entre na pasta criada
cd tekoa/

# Instale as dependências
$ yarn install

# Crie e personalize o arquivo de variáveis de ambiente (.env) baseado no arquivo de exemplo que está na raiz do projeto (env.sample)
$ cp env.sample .env

# Para rodar em ambiente de desenvolvimento execute:
$ yarn dev

# O comando anterior sobe o projeto com hot-reload na seguinte url:
http://localhost:3000

# Para compilar e rodar a versão de produção:
$ yarn build
$ yarn start

# Para gerar uma versão estática do frontend
$ yarn generate

```

