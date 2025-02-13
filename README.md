# Stock Api

Uma API de estoque para testar projetos front-end.

## Índice

1. [Rodando localmente](#rodando-localmente)
2. [Banco de dados](#banco-de-dados)
   - [Tabelas](#tabelas)
     - [users](#users)
     - [stocks](#stocks)
     - [categories](#categories)
     - [products](#products)
3. [End-points](#end-points)
   - [Produtos](#1-produtos)
     - [1.1 Retorna todos produtos do usuário](#11-retorna-todos-produtos-do-usuário)
     - [1.2 Retorna um produto](#12-retorna-um-produto)
     - [1.3 Retorna todos produtos de uma categoria](#13-retorna-todos-produtos-de-uma-categoria)
     - [1.4 Retorna todos produtos de um estoque](#14-retorna-todos-produtos-de-um-estoque)
     - [1.5 Cria um produto](#15-cria-um-produto)
     - [1.6 Atualiza um produto](#16-atualiza-um-produto)
   - [Categorias](#2-categorias)
     - [2.1 Retorna todas categorias do usuário](#21-retorna-todas-categorias-do-usuário)
     - [2.2 Retorna uma categoria](#22-retorna-uma-categoria)
     - [2.3 Retorna todas categorias de um estoque](#23-retorna-todas-categorias-de-um-estoque)
     - [2.4 Cria uma categoria](#24-cria-uma-categoria)
     - [2.5 Atualiza uma categoria](#25-atualiza-uma-categoria)
   - [Estoques](#3-estoques)
     - [3.1 Retorna todos estoques do usuário](#31-retorna-todos-estoques-do-usuário)
     - [3.2 Retorna um estoque](#32-retorna-um-estoque)
     - [3.3 Cria um estoque](#33-cria-um-estoque)
     - [3.4 Atualiza um estoque](#34-atualiza-um-estoque)
   - [Autenticação](#4-autenticação)
     - [4.1 Logar usuário](#41-logar-usuário)
     - [4.2 Registrar usuário](#42-registrar-usuário)
   - [Pesquisa](#5-pesquisa)
4. [Tipos de retorno](#tipos-de-retorno)
   - [Produtos](#1-produtos)
   - [Categorias](#2-categorias)
   - [Estoques](#3-estoques)

## Rodando localmente

Clone o projeto

```bash
  git clone s://matusal3m/stock-api
```

_ou_

```bash
  gh repo clone Matusal3m/stock-api
```

Entre no diretório do projeto

```bash
  cd stock-api
```

Instale as dependências

```bash
  bun i
```

Crie e configure o arquivo `.env` assim como mostra o [`.env.example`](./.env.example)

Inicialize o banco de dados

```bash
  bun run migrate
  bun run db:seed
```

Rode o projeto

```bash
  bun start
```

## Banco de dados

O banco de dados utilizado é o SQLite. São criados, com o método [`seed`](./src/database/seed.ts):

- 1000 produtos;
- 50 categorias;
- 5 estoques;

todos registrados no usuário padrão, com os seguintes dados:

```
{
  id: 1,
  name: "admin",
  password: "admin",
  email: "admin@teste.com",
}
```

### Tabelas

#### **users**

| Campo    | Tipo    | Descrição                                          |
| -------- | ------- | -------------------------------------------------- |
| id       | INTEGER | Chave primária, auto-incrementada.                 |
| name     | TEXT    | Nome do usuário (máximo de 20 caracteres).         |
| email    | TEXT    | Email do usuário (máximo de 60 caracteres), único. |
| password | TEXT    | Senha do usuário.                                  |

#### **stocks**

| Campo  | Tipo    | Descrição                                                                       |
| ------ | ------- | ------------------------------------------------------------------------------- |
| id     | INTEGER | Chave primária, auto-incrementada.                                              |
| name   | TEXT    | Nome do estoque (máximo de 20 caracteres).                                      |
| userId | INTEGER | Referência para a tabela `users`, representa o usuário proprietário do estoque. |

#### **categories**

| Campo   | Tipo    | Descrição                                                                             |
| ------- | ------- | ------------------------------------------------------------------------------------- |
| id      | INTEGER | Chave primária, auto-incrementada.                                                    |
| name    | TEXT    | Nome da categoria (máximo de 20 caracteres).                                          |
| stockId | INTEGER | Referência para a tabela `stocks`, representa o estoque ao qual a categoria pertence. |
| userId  | INTEGER | Referência para a tabela `users`, representa o usuário proprietário da categoria.     |

#### **products**

| Campo       | Tipo    | Descrição                                                                   |
| ----------- | ------- | --------------------------------------------------------------------------- |
| id          | INTEGER | Chave primária, auto-incrementada.                                          |
| name        | TEXT    | Nome do produto (máximo de 20 caracteres).                                  |
| description | TEXT    | Descrição do produto (máximo de 60 caracteres).                             |
| quantity    | INTEGER | Quantidade disponível do produto.                                           |
| categoryId  | INTEGER | Referência para a tabela `categories`, indica a categoria do produto.       |
| stockId     | INTEGER | Referência para a tabela `stocks`, indica o estoque onde o produto está.    |
| userId      | INTEGER | Referência para a tabela `users`, indica o usuário proprietário do produto. |

## End-points

#### _ATENÇÃO: Em todos os end-points abaixo, exceto [`/search`](#5-pesquisa) e [`/auth`](#4-autenticação), é necessário enviar o JWT no header como `authorization`_

### 1. Produtos

#### 1.1 Retorna todos produtos do usuário

```
  GET /products
```

#### 1.2 Retorna um produto

```
  GET /products/${id}
```

#### 1.3 Retorna todos produtos de uma categoria

```
  GET /products/category/${id}
```

#### 1.4 Retorna todos produtos de um estoque

```
  GET /products/stock/${id}
```

#### 1.5 Cria um produto

```
  POST /products

  body: {
    name: string;
    description?: string,
    quantity?: number,
    stockId: number,
    categoryId: number
  }
```

#### 1.6 Atualiza um produto

```
  PUT /products

  body: {
    id: number,
    name?: string;
    description?: string,
    quantity?: number,
    stockId?: number,
    categoryId?: number
  }
```

### 2. Categorias

#### 2.1 Retorna todas categorias do usuário

```
  GET /categories
```

#### 2.2 Retorna uma categoria

```
  GET /categories/${id}
```

#### 2.3 Retorna todas categorias de um estoque

```
  GET /categories/stock/${id}
```

#### 2.4 Cria uma categoria

```
  POST /categories

  body: {
    name: string,
    stockId: number,
  }
```

#### 2.5 Atualiza uma categoria

```
  PUT /categories

  body: {
    id: number,
    name?: string,
    stockId?: number,
  }
```

### 3. Estoques

#### 3.1 Retorna todos estoques do usuário

```
  GET /stocks
```

#### 3.2 Retorna um estoque

```
  GET /stocks/${id}
```

#### 3.3 Cria um estoque

```
  POST /stocks

  body: {
    name: string,
  }
```

#### 3.4 Atualiza um estoque

```
  PUT /stocks

  body: {
    id: number,
    name?: string,
  }
```

### 4. Autenticação

#### 4.1 Logar usuário

```
  POST /auth/login

  body: {
    email: string,
    password: string,
  }

  Retorna JWT
```

#### 4.2 Registrar usuário

```
  POST /auth/register

  body: {
    name: string,
    email: string,
    password: string,
  }

  Retorna JWT
```

### 5. Pesquisa

```
  POST /search

  body: {
    query: string,
  }

  Retorna categorias e produtos que possuem nome que coincide com a pesquisa
```

## Tipos de retorno

### 1. Produtos

- Ao chamar `GET /products`

```
{
  id: number;
  name: string;
  quantity: number;
  description: string | null;
  category: string;
  stock: string;
}[]
```

- Qualquer outro retorno unitário

```
{
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  categoryId: number;
  userId: number;
  stockId: number;
}
```

### 2. Categorias

- Ao chamar `GET /categories`

```
{
  id: number;
  name: string;
  stockId: number;
  stock: string;
  productsCount: number;
}[]
```

- Qualquer outro retorno unitário

```
{
  id: number;
  name: string;
  userId: number;
  stockId: number;
}
```

### 3. Estoques

- Ao chamar `GET /stocks`

```
{
  id: number;
  name: string;
  productsCount: number;
  categoriesCount: number;
}[]
```

- Qualquer outro retorno unitário

```
{
  id: number;
  name: string;
  userId: number;
}
```
