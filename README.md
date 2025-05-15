# Documentação do Gerenciador de Reservas API

## Visão Geral

O Gerenciador de Reservas é uma API RESTful desenvolvida para gerenciar usuários, imóveis e reservas. A API utiliza MongoDB como banco de dados e JWT para autenticação.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcryptjs (para criptografia de senhas)
- Jest e Supertest (para testes automatizados)

## Endpoints da API

### Autenticação e Usuários

| Método | Endpoint                 | Descrição                     | Corpo da Requisição      | Resposta                                      |
| ------ | ------------------------ | ----------------------------- | ------------------------ | --------------------------------------------- |
| POST   | `/api/usuarios/cadastro` | Cadastra um novo usuário      | `{ nome, email, senha }` | `{ _id, nome, email }`                        |
| POST   | `/api/usuarios/login`    | Autentica um usuário          | `{ email, senha }`       | `{ token }`                                   |
| GET    | `/api/usuarios/me`       | Obtém dados do usuário logado | -                        | `{ _id, nome, email }`                        |
| DELETE | `/api/usuarios/me`       | Remove a conta do usuário     | -                        | `{ message: "Usuário removido com sucesso" }` |

### Imóveis

| Método | Endpoint                  | Descrição                              | Corpo da Requisição  | Resposta                                     |
| ------ | ------------------------- | -------------------------------------- | -------------------- | -------------------------------------------- |
| GET    | `/api/imoveis`            | Lista todos os imóveis do usuário      | -                    | Array de imóveis                             |
| POST   | `/api/imoveis`            | Cadastra um novo imóvel                | `{ nome, endereco }` | Imóvel criado                                |
| GET    | `/api/imoveis/:imovel_id` | Obtém detalhes de um imóvel específico | -                    | Detalhes do imóvel                           |
| DELETE | `/api/imoveis/:imovel_id` | Remove um imóvel                       | -                    | `{ message: "Imóvel removido com sucesso" }` |

### Reservas

| Método | Endpoint                                       | Descrição                                | Corpo da Requisição                                                  | Resposta                                      |
| ------ | ---------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------- |
| GET    | `/api/reservas`                                | Lista todas as reservas do usuário       | -                                                                    | Array de reservas                             |
| GET    | `/api/reservas/:reserva_id`                    | Obtém detalhes de uma reserva específica | -                                                                    | Detalhes da reserva                           |
| GET    | `/api/imoveis/:imovel_id/reservas`             | Lista reservas de um imóvel específico   | -                                                                    | Array de reservas                             |
| POST   | `/api/imoveis/:imovel_id/reservas`             | Cria uma nova reserva                    | `{ data_inicio, data_fim, nome, contato, entrada?, sinal?, valor? }` | Reserva criada                                |
| DELETE | `/api/imoveis/:imovel_id/reservas/:reserva_id` | Remove uma reserva                       | -                                                                    | `{ message: "Reserva removida com sucesso" }` |

## Modelos de Dados

### Usuário

```json
{
  "_id": "ObjectId()",
  "nome": "String",
  "email": "String (único)",
  "senha": "String (criptografada)"
}
```

### Imóvel

```json
{
  "_id": "ObjectId()",
  "usuarioId": "ObjectId()",
  "nome": "String",
  "endereco": "String"
}
```

### Reserva

```json
{
  "_id": "ObjectId()",
  "usuarioId": "ObjectId()",
  "imovelId": "ObjectId()",
  "data_inicio": "Date",
  "data_fim": "Date",
  "nome": "String",
  "contato": "String",
  "entrada": "Number (opcional)",
  "sinal": "Number (opcional)",
  "valor": "Number (opcional)"
}
```

## Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Tokens). Para acessar endpoints protegidos, é necessário incluir o token no cabeçalho da requisição:

```
Authorization: Bearer <token>
```

O token é obtido através do endpoint de login e tem validade limitada.

## Tratamento de Erros

A API retorna os seguintes códigos de status HTTP:

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos ou faltando
- `401 Unauthorized`: Autenticação necessária ou inválida
- `403 Forbidden`: Sem permissão para acessar o recurso
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

## Executando o Projeto

### Requisitos

- Node.js
- MongoDB

### Instalação

```bash
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
MONGO_URI=sua_uri_do_mongodb
DB_NOME=nome_do_seu_banco_de_dados
JWT_SECRET=seu_segredo_jwt
CLOUDINARY_CLOUD_NAME=seu_cloudinary_cloud_name
CLOUDINARY_API_KEY=sua_cloudinary_api_key
CLOUDINARY_API_SECRET=seu_cloudinary_api_secret
TOKEN_INVERT_TEXTO=seu_token_invert_texto (para retornar os feriados)
```

### Iniciar o Servidor

```bash
npm start
```

### Executar Testes

```bash
npm run test
```

Para verificar a cobertura de testes:

```bash
npx jest --coverage
```

## Sugestões de Melhorias Futuras

1. Implementar endpoints para atualização de recursos (PUT/PATCH)
2. Adicionar paginação para endpoints que retornam listas
3. Implementar filtros e ordenação para consultas
4. Adicionar validação de dados mais robusta
5. Implementar sistema de recuperação de senha
6. Adicionar suporte a upload de imagens para imóveis

## Licença

Este projeto ainda não tem uma licença definida. 🚧
