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
   ```
4. Inicie o servidor:
   ```bash
   npm run start
   ```

## 🔎 Rotas da API

### ✅ Status

- `GET /api` → Verifica se a API está online.

### 👤 Usuários

- `POST /api/usuarios/cadastro` → Cadastro de novo usuário.
- `POST /api/usuarios/login` → Autenticação via JWT.
- `GET /api/usuarios/me` → Dados do usuário logado.
- `DELETE /api/usuarios/me` → Remover conta.

### 🏠 Imóveis

- `GET /api/imoveis` → Lista de imóveis do usuário.
- `POST /api/imoveis` → Cadastro de imóvel.
- `GET /api/imoveis/:imovel_id` → Detalhes do imóvel.
- `DELETE /api/imoveis/:imovel_id` → Remoção de imóvel.

### 📅 Reservas

- `GET /api/reservas` → Reservas do usuário.
- `POST /api/imoveis/:imovel_id/reservas` → Criar reservas.
- `DELETE /api/imoveis/:imovel_id/reservas` → Remover reservas.

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

## 🧪 Testes Automatizados

Seu projeto agora conta com **testes automatizados usando Jest e Supertest**, garantindo que a API funcione corretamente. Para executar os testes:

```bash
npm run test
```

Execute `jest --coverage` para verificar a cobertura de código e identificar pontos de melhoria.

## 📜 Licença

Este projeto ainda não tem uma licença definida. 🚧
