# Plataforma Redes Agroecológicas

## A Iniciativa Redes Agroecológicas é uma ferramenta tecnológica que tem como objetivo facilitar a comunicação e aumentar a visibilidade de redes agroecológicas. Esta é uma plataforma de código aberto e toda colaboração é bem vinda.

### Abaixo as instruções para desenvolvedores

```bash
# Clone este repositório
git clone https://github.com/diegomr86/redes-agroecologicas.git

# Entre no diretório que acabou de baixar
cd redes-agroecologicas/

# Instale as dependências
$ yarn install

# Para rodar o a versão de desenvolvimento com hot reload no localhost:3000 execute:
$ yarn dev

# Com o servidor de desenvolvimento rodando é necessario gerar o primeiro super usuário. Para isso acesse:
http://localhost:3000/api/auth/init

# o servidor gerará uma rede de teste e um super usuário e então retornará os dados do usuário gerado. Use esses dados para acessar o painel administrativo da plataforma:
http://localhost:3000/admin

# para compilar e a versão de produção:
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
## Aways run "yarn lint" before commit

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
