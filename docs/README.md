# Restaurant-Backend-RestAPI

![Node](https://img.shields.io/badge/Node.JS-white?style=for-the-badge&logo=node.js&logoColor=black)
![Nest](https://img.shields.io/badge/Nest.JS-white?style=for-the-badge&logo=nestjs&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-white?style=for-the-badge&logo=jest&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=TypeScript&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-white?style=for-the-badge&logo=prisma&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=Docker&logoColor=black)
![Mongo](https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-white?style=for-the-badge&logo=swagger&logoColor=black)

> [Desafio.md](Desafio.md)

A principal funcionalidade da aplicação está em cadastrar produtos organizados por categorias e adicioná-los em cardápios separados por período diurno e noturno. Isso inclui o gerenciamento deles através do CRUD, o tratamento de regras de negócio que é, por exemplo, não duplicar produtos em cardápios ou remover produtos que estejam adicionados em cardápios.

-   [Restaurant-Backend-RestAPI](#restaurant-backend-restapi)
    -   [Dependências](#dependências)
    -   [Funcionalidades](#funcionalidades)
    -   [Instalação](#instalação)
    -   [Variáveis de ambiente](#variáveis-de-ambiente)
    -   [Docker](#docker)
    -   [Prisma](#prisma)
    -   [Subir o servidor](#subir-o-servidor)
    -   [Testes](#testes)
    -   [Licença](#licença)
    -   [ERD](#erd)
    -   [Endpoints](#endpoints)

## Dependências

| Ferramenta / Pacote |    Versão     | Opcional |
| :------------------ | :-----------: | :------: |
| Docker Desktop      |      ^4       |          |
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
yarn install && yarn build
```

Copie o template do env para .env

```sh
cp env-example .env
```

## Variáveis de ambiente

```sh
# Utilize esse esquema para conectar com o mongo ATLAS
DATABASE_URL="mongodb+srv://{username}:{password}.{host}/{database}?retryWrites=true&w=majority"

# Ou esse para conectar com o container do docker mongo
DATABASE_URL="mongodb://root:root@localhost:27017/restaurant?authSource=admin"
```

## Docker

```sh
# Altere as permissões do script  para subir o mongo_replica
chmod +x docker/mongo/mongo-replica.sh
```

```sh
# Para executar o script e subir o container
docker/mongo/mongo-replica.sh
```

```sh
# Para acessar o terminal do mongo
docker exec -it mongo mongosh

#  Use: yarn prisma studio para visualizar as coleções
show dbs
use restaurant
db.auth('root', 'root')
show collections
```

## Prisma

```sh
yarn prisma generate # atualizar o prisma.schema
yarn prisma db push # subir o schema para o banco de dados
yarn prisma studio # visualizar os dados
```

## Subir o servidor

```sh
yarn run start # production  - [node dist/src/main]
yarn run start:dev # watch  - [nest start --watch]
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
