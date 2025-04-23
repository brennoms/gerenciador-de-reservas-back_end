# Gerenciador de Reservas - API

## 📋 Descrição

Esta API foi desenvolvida para gerenciar dados de um sistema de **gerenciamento de reservas de imóveis**. Ela oferece funcionalidades como controle de **usuários**, **imóveis cadastrados por usuários** e **reservas feitas nesses imóveis**.

---

## Estrutura do Projeto

## Rotas

### ✅ Status

### `GET /api`

- Verifica se a API está online.
- **Resposta esperada:**
  > ```json
  > { "status": "API rodando" }
  > ```

---

### 👤 Usuários

### `POST /api/usuarios/cadastro`

- Cadastra um novo usuário.
- **Body:**
  > ```json
  > {
  >   "nome": "João",
  >   "email": "joao@exemplo.com",
  >   "senha": "senha123"
  > }
  > ```

### `POST /api/usuarios/login`

- Faz login e retorna um token JWT.
- **Body:**
  > ```json
  > {
  >   "email": "joao@exemplo.com",
  >   "senha": "senha123"
  > }
  > ```
- **Resposta:**
  > ```json
  > { "token": "JWT_TOKEN" }
  > ```

### `GET /api/usuarios/me`

- Retorna os dados do usuário logado.
- **Header:** `Authorization: Bearer <token>`

### `DELETE /api/usuarios/me`

- Remove o próprio usuário.
- **Header:** `Authorization: Bearer <token>`

---

### 🏠 Imóveis

### `GET /api/imoveis`

- Lista os imóveis do usuário logado.
- **Header:** `Authorization: Bearer <token>`

### `POST /api/imoveis`

- Cria um novo imóvel.
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  > ```json
  > {
  >   "nome": "Casa de Praia",
  >   "imagem": "https://imagem.com/casa.jpg",
  >   "endereço": "Rua do Sol, 123"
  > }
  > ```

### `GET /api/imoveis/:imovel_id`

- Retorna detalhes de um imóvel.
- **Header:** `Authorization: Bearer <token>`

### `DELETE /api/imoveis/:imovel_id`

- Remove um imóvel.
- **Header:** `Authorization: Bearer <token>`

---

### 📅 Reservas

### `GET /api/reservas`

- Lista todas as reservas do usuário logado (em todos os imóveis).
- **Header:** `Authorization: Bearer <token>`

### `GET /api/imoveis/:imovel_id/reservas`

- Lista as reservas de um imóvel.
- **Header:** `Authorization: Bearer <token>`

### `POST /api/imoveis/:imovel_id/reservas`

- Cria uma ou mais reservas.
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  > ```json
  > [
  >   {
  >     "dataInicio": "2025-05-01",
  >     "dataFim": "2025-05-03"
  >   }
  > ]
  > ```

### `DELETE /api/imoveis/:imovel_id/reservas`

- Remove reservas específicas.
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  > ```json
  > [
  >   {
  >     "dataInicio": "2025-05-01",
  >     "dataFim": "2025-05-03"
  >   }
  > ]
  > ```

---

## Coleções (MongoDB)

### `usuarios`

> ```json
> {
>   "_id": "ObjectId() -> gerado pelo MondoDB",
>   "nome": "",
>   "email": "", //index unico
>   "senha": "senha cryptografada bcriptyjs"
> },
> ...
> ```

### `imoveis`

> ```json
> {
>   "_id": "ObjectId() -> gerado pelo MondoDB",
>   "usuarioId": "", //index
>   "nome": "",
>   "endereco": ""
> },
> ...
> ```

### `reservas`

> ```json
> {
>   "_id": "ObjectId() -> criado pelo MDB",
>   "usuarioId": "", //index
>   "imovelId": "", //index
>   "data": "",
>   "nome": "",
>   "contato": "",
>   "entrada": "",
>   "sinal": "",
>   "valor": ""
> },
> ...
> ```

---

### 🗂️ Pastas

- **`controllers/`**: lógica principal das rotas
- **`middlewares/`**: autenticação, tokens e segurança
- **`models/`**: integração com o banco de dados (MongoDB)
- **`routes/`**: definição das rotas da API
- **`util/`**: funções utilitárias e módulos genéricos

---

### documentos

#### `.env`

```http
MONGO_URI={string de conexão}
DB_NOME={nome do banco de dados}
JWT_SECRET={palavra passe}
```

---

## 🛠️ Tecnologias Utilizadas

### Linguagem:

- JavaScript (Node.js)

### Dependências:

- express
- bcryptjs
- cors
- dotenv
- jsonwebtoken
- mongodb

### Banco de Dados:

- MongoDB Atlas

---

## ▶️ Como Executar

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd nome-do-projeto
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure variáveis de ambiente**:
   Crie um arquivo `.env` e defina as variáveis necessárias, como a string de conexão com o banco de dados e a chave JWT.

4. **Inicie o servidor**:

```bash
npm start
```

---

## ✅ Checklist

- [x] Cadastro de usuário
- [x] Autenticação com JWT
- [x] CRUD de imóveis
- [x] Controle de reservas

---

## 📄 Licença

Este projeto está licenciado sob a **ainda não decidi**. Consulte o arquivo `LICENSE` para mais detalhes.
