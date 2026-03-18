# sizebay-api

## Subindo com Docker

```bash
docker compose up -d
```

Servicos disponiveis:

- API em `http://localhost:3050`
- MongoDB em `mongodb://localhost:27017/sizebay`

No ambiente do container da API, a conexao com o Mongo fica disponivel em `MONGO_URL=mongodb://mongo:27017/sizebay`.
