# Gerenciador de Reservas - API

## 📋 Descrição

Esta API foi desenvolvida para gerenciar dados de um sistema de **gerenciamento de reservas de imóveis**. Ela oferece funcionalidades como controle de **usuários**, **imóveis cadastrados por usuários** e **reservas feitas nesses imóveis**.

---

## 📁 Estrutura do Projeto

### 📦 Rotas

#### `/api` (em desenvolvimento)

```http
GET /api
- Rota inicial, retorna o status da API
```

#### `/api/usuario`

```http
GET /api/usuario
- Retorna o usuário logado
- Header: Authorization

DELETE /api/usuario
- Remove o usuário logado
- Header: Authorization
```

#### `/api/usuario/login`

```http
POST /api/usuario/login
- Retorna token de acesso
- Body: { email, senha }
- Resposta: { token }
```

#### `/api/usuario/cadastro`

```http
POST /api/usuario/cadastro
- Cria um novo usuário
- Body: { nome, email, senha }
```

#### `/api/usuario/imoveis`

```http
GET /api/usuario/imoveis
- Retorna imóveis do usuário
- Header: Authorization

POST /api/usuario/imoveis
- Cria novo imóvel
- Header: Authorization
- Body: { nome, imagem, endereço }
```

#### `/api/usuario/imoveis/:imovel_id`

```http
GET /api/usuario/imoveis/:imovel_id
- Retorna detalhes de um imóvel
- Header: Authorization

DELETE /api/usuario/imoveis/:imovel_id
- Remove imóvel
- Header: Authorization
```

#### `/api/usuario/reservas/:imovel_id`

```http
GET /api/usuario/reservas/:imovel_id
- Retorna as reservas do imóvel
- Header: Authorization

POST /api/usuario/reservas/:imovel_id
- Cria nova reserva
- Header: Authorization
- Body: { reservas }

DELETE /api/usuario/reservas/:imovel_id
- Remove reservas
- Header: Authorization
- Body: { reservas }
```

---

### Coleções (MongoDB)

#### `usuarios`

```http
{
   "_id": "ObjectId() -> gerado pelo MondoDB",
   "nome": "",
   "email": "", //index unico
   "senha": "senha cryptografada bcriptyjs"
},
...
```

#### `imoveis`

```http
{
   "_id": "ObjectId() -> gerado pelo MondoDB",
   "usuarioId": "", //index
   "nome": "",
   "endereco": ""
},
...
```

#### `reservas`

```http
{
   "_id": "ObjectId() -> criado pelo MDB",
   "usuarioId": "", //index
   "imovelId": "", //index
   "data": "",
   "nome": "",
   "contato": "",
   "entrada": "",
   "sinal": "",
   "valor": ""
},
...
```

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
