# Gerenciador de Reservas - API 🏡

## 📄 Descrição

Esta API foi desenvolvida para gerenciar um sistema de reservas de imóveis, oferecendo funcionalidades como:

- Controle de usuários e autenticação JWT 🔑
- Cadastro e gerenciamento de imóveis 🏠
- Criação e gerenciamento de reservas 📅
- Banco de dados estruturado no **MongoDB Atlas** 💾

## 📂 Estrutura do Projeto

```
📦 gerenciador-de-reservas-back_end
├── controllers/        # Lógica principal das rotas
├── middlewares/        # Autenticação, tokens e segurança
├── models/            # Integração com o banco de dados
├── routes/            # Definição das rotas da API
├── tests/             # Testes automatizados com Jest
├── utils/             # Funções utilitárias
└── README.md          # Documentação
```

## 🚀 Tecnologias Utilizadas

- **Node.js + Express**
- **MongoDB Atlas**
- **Cloudinary**
- **multer** para upload de arquivos
- **Autenticação JWT + bcryptjs**
- **Jest + Supertest** para testes automatizados ✅
- **CI/CD** (implementação em progresso) 🔄

## 🛠️ Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/brennoms/gerenciador-de-reservas-back_end.git
   cd gerenciador-de-reservas-back_end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure variáveis de ambiente (`.env`):

   ```
   MONGO_URI=<sua-string-de-conexão>
   DB_NOME=<nome-do-banco>
   JWT_SECRET=<chave-secreta>

   CLOUDINARY_CLOUD_NAME=<seu-cloud-name>
   CLOUDINARY_API_KEY=<sua-api-key>
   CLOUDINARY_API_SECRET=<seu-api-secret>
   ```

4. Inicie o servidor:
   ```bash
   npm run start
   ```

## 🔎 Rotas da API

### ✅ Status

- `GET /api`
  ```javascript
  // Verifica se a API está online.
  ```

### 👤 Usuários

- `POST /api/usuarios/cadastro`

  ```javascript
  // Cadastro de novo usuário.
  req.body === { nome, email, senha };
  ```

- `POST /api/usuarios/login`

  ```javascript
  // Autenticação via JWT.
  res.body === { token };
  ```

- `GET /api/usuarios/me`

  ```javascript
  // Dados do usuário logado.
  ```

- `DELETE /api/usuarios/me`
  ```javascript
  // Remover conta.
  ```

### 🏠 Imóveis

- `GET /api/imoveis`

  ```javascript
  // Lista de imóveis do usuário.
  ```

- `POST /api/imoveis`

  ```javascript
  // Cadastro de imóvel.
  req.body === { nome, endereco };
  ```

- `GET /api/imoveis/:imovel_id`

  ```javascript
  // Detalhes do imóvel.
  ```

- `DELETE /api/imoveis/:imovel_id`
  ```javascript
  // Remoção de imóvel.
  ```

### 📅 Reservas

- `GET /api/reservas`

  ```javascript
  // Reservas do usuário.
  ```

- `GET /api/reservas/:reserva_id`

  ```javascript
  // Detalhes de uma reserva.
  ```

- `GET /api/imoveis/:imovel_id/reservas`

  ```javascript
  // Reservas de um imóvel do usuário.
  ```

- `POST /api/imoveis/:imovel_id/reservas`

  ```javascript
  // Criar reserva.
  req.body === { data_inicio, data_fim, nome, contato };
  ```

- `DELETE /imoveis/:imovel_id/reservas/:reserva_id`
  ```javascript
  // Remover reserva.
  ```

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
>   "data_inicio": "",
>   "data_fim": "",
>   "nome": "",
>   "contato": "",
>   "entrada": "",
>   "sinal": "",
>   "valor": ""
> },
> ...
> ```

---

## 🧪 Testes Automatizados

Seu projeto agora conta com **testes automatizados usando Jest e Supertest**, garantindo que a API funcione corretamente. Para executar os testes:

```bash
npm run test
```

Execute `jest --coverage` para verificar a cobertura de código e identificar pontos de melhoria.

## 📜 Licença

Este projeto ainda não tem uma licença definida. 🚧
