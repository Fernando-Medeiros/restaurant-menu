# Restaurant-Backend-RestAPI

![Node](https://img.shields.io/badge/Node.JS-white?style=for-the-badge&logo=node.js&logoColor=black)
![Nest](https://img.shields.io/badge/Nest.JS-white?style=for-the-badge&logo=nestjs&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-white?style=for-the-badge&logo=jest&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=TypeScript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=Docker&logoColor=black)
![Mongo](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-white?style=for-the-badge&logo=swagger&logoColor=black)

-   [Restaurant-Backend-RestAPI](#restaurant-backend-restapi)
    -   [Dependências](#dependências)
    -   [Funcionalidades](#funcionalidades)
    -   [Instalação](#instalação)
    -   [Variáveis de ambiente](#variáveis-de-ambiente)
    -   [Docker](#docker)
    -   [Subir o servidor](#subir-o-servidor)
    -   [Testes](#testes)
    -   [Licença](#licença)
    -   [ERD](#erd)
    -   [Endpoints](#endpoints)

## Dependências

| Ferramenta / Pacote |    Versão     | Opcional |
| :------------------ | :-----------: | :------: |
| Docker Desktop      |      ^4       |    x     |
| Docker Compose      |      ^2       |    x     |
| VsCode              |     ^1.8      |    x     |
| Node                |      ^18      |          |
| Yarn ou Npm         | ^1.22 ou ^9.8 |          |

## Funcionalidades

| Nome           |   Post   |                     Get                      | Patch  |  Put   | Delete |
| :------------- | :------: | :------------------------------------------: | :----: | :----: | :----: |
| **Menus**      | register | [findOne, findMany, findManyByCurrentPeriod] |        | update | remove |
| **Products**   | register |             [findOne, findMany]              | update |        | remove |
| **Categories** | register |      [findOne, findMany, findProducts]       | update |        | remove |

## Instalação

Instale as dependências do [package.json](../package.json)

```sh
yarn install
```

Copie o template do env para .env

```sh
cp env-example .env
```

## Variáveis de ambiente

> **UTILIZE O MONGO ATLAS**

```sh
# Utilize esse esquema para conectar com o mongo ATLAS
DATABASE_URL="mongodb+srv://{username}:{password}.{host}/{database}?retryWrites=true&w=majority"

# Ou esse para conectar com o container do docker mongo
DATABASE_URL="mongodb://root:12345@localhost:27017/Restaurant"
```

## Docker

> **A Imagem do bitnami/mongodb com a configuração atual possui conflitos com o prisma e será resolvido em breve.**

-   [docker-compose](../docker/mongo/docker-compose.yml)
-   [bitnami/mongodb:latest](https://hub.docker.com/r/bitnami/mongodb)

```sh
# Para subir o container
cd docker/mongo
docker compose up -d # p/ iniciar o container
docker compose stop # p/ parar o container
```

```sh
# Para acessar o terminal do mongo
cd docker/mongo
docker compose exec mongo mongosh

show dbs
use Restaurant
db.auth('root', '12345')
show collections
```

## Subir o servidor

```sh
yarn run start # development
yarn run start:dev # watch mode
yarn run start:prod # production mode
```

## Testes

```sh
yarn run test # unit tests
yarn run test:e2e # e2e tests
yarn run test:cov # test coverage
```

## Licença

Nest is [MIT licensed](LICENSE).

## ERD

![ERD](../prisma/ERD.svg)

## Endpoints

![endpoints](endpoints.png)
![schemas](schemas.png)
