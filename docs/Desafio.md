# Desafio [Backend RestAPI]

## Respostas

### 1 - Qual foi a maior dificuldade que você enfrentou ao realizar o teste?

Não houve uma grande dificuldade, apenas um tempo para me adaptar ao framework, porque antes de começar o teste eu estava muito focando em ASPNET com C#.

### 2 - Descreva a funcionalidade e o por quê da utilização das bibliotecas escolhidas por você para concluir o desafio.

#### [class-transformer](https://www.npmjs.com/package/class-transformer) e [class-validator](https://www.npmjs.com/package/class-validator)

É bem comum utilizando nestjs, transferir a responsabilidade das validações das requisições para DTOs, para isso as bibliotecas class transformer e validator são utilizadas para adicionar tags (decoradores) sobre as propriedades.

#### [@nestjs/swagger](https://www.npmjs.com/package/@nestjs/swagger) e [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

A documentação para uma API com o swagger é sem dúvidas, indispensável, faz parte do projeto documentar os endpoints, tornar as funcionalidades inteligíeis para outros desenvolvedores.

1.  O @nestjs/swagger permite adicionar a tags dinamicamente para documentar controladores, endpoints, propriedades.

2.  O swagger-ui-express trabalha com a interface para o usuário final da API utilizando a documentação feita com o @nestjs/swagger.

> Este conjunto de bibliotecas torna a vida do desenvolvedor mais produtiva e melhora a qualidade do projeto, porque você consegue documentar rapidamente conforme novas funcionalidades vão sendo adicionadas.

### 3 - Como você se vê daqui a 5 anos?

Daqui exatos 5 anos eu me vejo atingindo os meus principais objetivos idealizados em 2022, que é ter uma carreira em desenvolvimento de software e um conhecimento avançado em inglês.

## Requisitos

### Sobre o funcionamento da aplicação:

-   [x] Imagine que essa **aplicação será para expor produtos por meio
        de cardápios.** Você deverá criar **dois cardápios**, um cardápio
        para o **turno noturno**, e outro para o **turno diurno**.

-   [x] Haverá uma **entidade de produtos**, na qual, obrigatoriamente,
        deverá conter as informações: Preço, nome do produto,
        imagem e uma breve descrição. Atenção: Você poderá
        adicionar outras informações, caso deseje. Isso é um plus, por
        sinal.

-   [x] Os **produtos** deverão ser **organizados por categorias**.

-   [x] Deverá haver um **crud** para o **cardápio, categorias e produtos**.

-   [x] Deverá haver um **endpoint** que **retorne o cardápio** de **acordo**
        com a **hora atual**. Caso seja à noite, este endpoint deverá
        retornar o **cardápio noturno**, caso seja dia, o **diurno**.

-   [x] Deverá haver um endpoint onde você consiga **obter detalhes
        de um único produto**.

-   [x] Deverá haver um endpoint onde você consiga **obter detalhes
        de uma única categoria**, **incluindo os produtos** que esta
        categoria pertença.
