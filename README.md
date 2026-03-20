# SizeBay URL Shortener API

API REST para encurtamento de URLs com estatísticas de acesso, construída com NestJS seguindo os princípios de Clean Architecture e DDD (Domain-Driven Design).

## Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **CQRS** - Command Query Responsibility Segregation
- **Swagger** - Documentação automática da API

## Pré-requisitos

- Docker e Docker Compose
- Node.js 20+ (para desenvolvimento local)

## Rodando com Docker

```bash
docker compose up -d
```

Serviços disponíveis:

- API: `http://localhost:3050`
- PostgreSQL: `localhost:5438`
- Swagger: `http://localhost:3050/api/docs`

## Scripts

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Iniciar em produção
yarn start

# Testes unitários
yarn test

# Testes e2e
yarn test:e2e

# Cobertura de testes
yarn test:cov
```

## Arquitetura

O projeto segue os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, implementando o padrão **CQRS** para separação de responsabilidades entre comandos (escrita) e consultas (leitura).

```mermaid
graph TB
    subgraph "Presentation Layer"
        C1[ShortUrlsController]
        C2[UrlStatsController]
        DT1[DTOs]
        PR1[Presenters]
    end

    subgraph "Application Layer"
        subgraph "Commands"
            CH1[CreateShortUrlCommand]
            CH2[UpdateShortUrlCommand]
            CH3[DeleteShortUrlCommand]
        end

        subgraph "Queries"
            QH1[GetShortUrlQuery]
            QH2[GetUrlStatsQuery]
        end

        subgraph "Use Cases"
            UC1[CreateShortUrlUseCase]
            UC2[GetShortUrlUseCase]
            UC3[UpdateShortUrlUseCase]
            UC4[DeleteShortUrlUseCase]
            UC5[GetUrlStatsUseCase]
        end

        subgraph "Event Handlers"
            EH1[ShortUrlAccessedHandler]
        end

        subgraph "Builders"
            B1[ShortUrlBuilder]
        end
    end

    subgraph "Domain Layer"
        E1[ShortUrl Entity]
        E2[UrlStats Entity]
        R1[ShortUrlRepository Interface]
        R2[UrlStatsRepository Interface]
        V1[Validators]
        EX1[Exceptions]
        EV1[ShortUrlAccessedEvent]
    end

    subgraph "Infrastructure Layer"
        OR1[ShortUrlPostgresRepository]
        OR2[UrlStatsPostgresRepository]
        OE1[ShortUrlOrmEntity]
        OE2[UrlStatsOrmEntity]
        M1[Mappers]
    end

    subgraph "Database"
        DB[(PostgreSQL)]
    end

    subgraph "CQRS Bus"
        CB[CommandBus]
        QB[QueryBus]
        EB[EventBus]
    end

    C1 --> CB
    C1 --> QB
    C2 --> QB

    CB --> CH1
    CB --> CH2
    CB --> CH3

    QB --> QH1
    QB --> QH2

    CH1 --> UC1
    CH2 --> UC3
    CH3 --> UC4

    QH1 --> UC2
    QH2 --> UC5

    UC1 --> R1
    UC2 --> R1
    UC3 --> R1
    UC4 --> R1
    UC5 --> R2

    UC2 --> EV1
    EV1 --> EB
    EB --> EH1

    R1 --> OR1
    R2 --> OR2

    OR1 --> OE1
    OR2 --> OE2

    OE1 --> DB
    OE2 --> DB
```

### Camadas

| Camada             | Responsabilidade                                                            |
| ------------------ | --------------------------------------------------------------------------- |
| **Presentation**   | Controllers, DTOs, Presenters - Interface HTTP                              |
| **Application**    | Use Cases, Commands, Queries, Event Handlers - Orquestração                 |
| **Domain**         | Entities, Repository Interfaces, Validators, Exceptions - Regras de negócio |
| **Infrastructure** | Repository Implementations, ORM Entities, Mappers - Persistência            |

### Padrões Implementados

- **CQRS**: Separação clara entre comandos (escrita) e consultas (leitura)
- **Repository Pattern**: Abstração do acesso a dados
- **Domain Entities**: Entidades com validação encapsulada
- **Event-Driven**: Eventos para comunicação assíncrona entre módulos
- **Dependency Injection**: Inversão de controle

## Módulos

### URL Shortener (`url-shortener`)

Responsável pelo CRUD de URLs encurtadas.

### URL Stats (`url-stats`)

Responsável pelas estatísticas de acesso das URLs.

## Endpoints

| Método   | Endpoint               | Descrição                      |
| -------- | ---------------------- | ------------------------------ |
| `POST`   | `/shorten`             | Criar uma nova URL encurtada   |
| `GET`    | `/shorten/:code`       | Obter URL original pelo código |
| `PUT`    | `/shorten/:code`       | Atualizar URL original         |
| `DELETE` | `/shorten/:code`       | Excluir URL encurtada          |
| `GET`    | `/shorten/:code/stats` | Obter estatísticas de acesso   |

## Estrutura de Pastas

```
src/
├── app.module.ts
├── main.ts
├── database/
│   ├── config/
│   └── migrations/
└── modules/
    ├── url-shortener/
    │   ├── domain/
    │   │   ├── entities/
    │   │   ├── exceptions/
    │   │   ├── repositories/
    │   │   ├── types/
    │   │   └── validators/
    │   ├── application/
    │   │   ├── builders/
    │   │   ├── commands/
    │   │   ├── queries/
    │   │   └── use-cases/
    │   ├── infrastructure/
    │   │   ├── entities/
    │   │   ├── mappers/
    │   │   └── repositories/
    │   └── presentation/
    │       └── http/
    │           ├── dto/
    │           └── presenters/
    └── url-stats/
        ├── domain/
        ├── application/
        ├── infrastructure/
        └── presentation/
```

## Diagrama de Entidades

```mermaid
erDiagram
    short_urls ||--o| shorten_url_stats : "has stats"

    short_urls {
        uuid id PK
        string code UK
        string original_url
        string short_url
        datetime created_at
        datetime updated_at
    }

    shorten_url_stats {
        uuid id PK
        uuid short_url_id FK
        int access_count
        datetime created_at
        datetime updated_at
    }
```

## Variáveis de Ambiente

| Variável            | Descrição             | Padrão     |
| ------------------- | --------------------- | ---------- |
| `PORT`              | Porta da API          | `3050`     |
| `POSTGRES_HOST`     | Host do PostgreSQL    | `postgres` |
| `POSTGRES_PORT`     | Porta do PostgreSQL   | `5432`     |
| `POSTGRES_USER`     | Usuário do PostgreSQL | `root`     |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL   | `root`     |
| `POSTGRES_DB`       | Nome do banco         | `sizebay`  |
