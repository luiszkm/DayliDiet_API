# DayliDiet
Trata-se de uma back-end para acompnhar refeições em uma dieta feita com boas pratioca de programação, leia mais abaixo:

## Stack utilizada

**Back-end:**
-  NodeJS
- Typescript
- SQL (PostgreSQL)
- fastify
- zod
- prisma ORM
- docker
- vitest

**Tests:**
- vitest
- testes unitários
- testes E2E
- testes de integração
- TDD

### Regras da aplicação

- [X] Deve ser possível criar um usuário
     - [X] unico email por usuário
     - [X] senha criptografada
     - [x] id unico por usuário
- [x] Deve ser possível identificar o usuário entre as requisições
      - [x] AUTENTICAR
      - [x] refresh token
      - [x] cookies
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência por dia de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou


## Instalação

Necessita ter Node e Docker Instalado em sua maquina

```bash
# Clone este repositório
$ git clone <https://github.com/luiszkm/DayliDiet_API.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

#executar os dockers containers
$ Docker compose up

# Rodar todos os testes
npm run test ou  npm t

# Rodar todos os testes unitarios
npm run test:unit 

# Rodar todos os testes E2E
npm run test:e2e

```

    
## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Apêndice

Feito com :heart: e dedicação por mim :rocket:

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luis-soares-64b0a6227/)


