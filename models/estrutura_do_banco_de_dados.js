"usuarios"
{
  {
    "_id": "ObjectId() -> gerado pelo MondoDB",
    "nome": "",
    "email": "", //index unico
    "senha": "senha cryptografada bcriptyjs"
  }
}

"imoveis"
{
  {
    "_id": "ObjectId() -> gerado pelo MondoDB",
    "usuarioId": "", //index
    "nome": "",
    "endereco": ""
  }
}

"reservas"
{
  {
    "_id": "ObjectId() -> criado pelo MDB"
    "usuarioId": "", //index
    "imovelId": "" //index
    "data": "",
    "nome": "",
    "contato": "",
    "entrada": "",
    "sinal": "",
    "valor": ""
  }
}
