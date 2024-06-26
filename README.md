# Aplicativo de Gestão Financeira

<p align="center">
  <img src="https://img.shields.io/static/v1?label=react&message=framework&color=blue&style=for-the-badge&logo=REACT"/>
  <img src="https://img.shields.io/static/v1?label=Netlify&message=deploy&color=blue&style=for-the-badge&logo=netlify"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=Ruby&message=2.6.3&color=red&style=for-the-badge&logo=ruby"/>
  <img src="http://img.shields.io/static/v1?label=Ruby%20On%20Rails%20&message=6.0.2.2&color=red&style=for-the-badge&logo=ruby"/>
  <img src="http://img.shields.io/static/v1?label=TESTES&message=%3E100&color=GREEN&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>

> Status do Projeto: :warning: (em desenvolvimento)

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Casos de Uso](#casos-de-uso)

:small_blue_diamond: [Linguagens, dependências e libs utilizadas](#linguagens-dependências-e-libs-utilizadas)

:small_blue_diamond: [Desenvolvedores/Contribuintes](#desenvolvedorescontribuintes)

:small_blue_diamond: [Licença](#licença)

## Descrição do projeto 

<p align="justify">
  Desenvolvimento de um aplicativo web de gestão financeira desenvolvido em JavaScript, HTML, CSS, React.js. Ele permite aos usuários registrar suas despesas e receitas, visualizar um balanço mensal e obter relatórios sobre a sua movimentação financeira.
</p>

## Funcionalidades

:heavy_check_mark: Registro de Despesas e Receitas: Os usuários podem adicionar despesas e receitas, especificando o valor, categoria, data e descrição.

:heavy_check_mark: Visualização do balanço mensal, mostrando o total de despesas, total de receitas e saldo final.

:heavy_check_mark: Gráficos de Gastos por Categoria: Integração de gráficos para representar visualmente os gastos por categoria.

:heavy_check_mark: Sugestões de Economia: Oferece sugestões de economia com base no comportamento do usuário e padrões de gastos.

## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)
:warning: [MongoDB](https://www.mongodb.com/cloud/atlas/register)
:warning: [Express](https://expressjs.com/pt-br/)

## Como rodar a aplicação :arrow_forward:

### Clonar o Repositório

No terminal, clone o projeto: 



```
git clone https://github.com/edsonpolucena/GestaoOrcamentos.git
```


### Configuração do Backend

1. Navegue até o diretório do backend:

    ```
    cd GestaoOrcamentos/backend
    ```

2. Instale as dependências:

    ```
    npm install
    ```

3. Configure o arquivo `.env` com suas credenciais do MongoDB:

    ```
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Inicie o servidor:

    ```
    npm start
    ```

    O backend estará rodando em `http://localhost:5000`.

### Configuração do Frontend

1. Abra um novo terminal e navegue até o diretório do frontend:

    ```
    cd GestaoOrcamentos/frontend
    ```

2. Instale as dependências:

    ```
    npm install
    ```

3. Inicie a aplicação React:

    ```
    npm start
    ```

    O frontend estará rodando em `http://localhost:3000`.

### Rodando a Aplicação

Após iniciar tanto o backend quanto o frontend, você poderá acessar a aplicação em `http://localhost:3000`.

## Casos de Uso

Explique com mais detalhes como a sua aplicação poderia ser utilizada. O uso de **gifs** aqui seria bem interessante. 

Exemplo: Caso a sua aplicação tenha alguma funcionalidade de login apresente neste tópico os dados necessários para acessá-la.

## Linguagens, dependências e libs utilizadas :books:

- [React](https://pt-br.legacy.reactjs.org/docs/getting-started.html)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Node](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- [Express](https://expressjs.com/pt-br/)

## Desenvolvedores/Contribuintes

Responsável pelo desenvolvimento do projeto:

[Edson Borges Polucena](https://www.linkedin.com/in/edsonborgespolucena/)
[Wuuelliton Christian dos Santos] (https://www.linkedin.com/in/wuelliton-christian-santos-080753189/)

## Licença 

The [MIT License](LICENSE) (MIT)

Copyright :copyright: 2024 - Gestão Financeira
