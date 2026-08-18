# Docker Config

Микросервисная архитектура с Docker Compose для разработки и продакшена.

## Архитектура

```
┌─────────────┐
│    nginx     │ :80
│  (reverse    │
│   proxy)     │
└──────┬───────┘
       │
┌──────┴───────┐
│   frontend   │ :3000
│  (React 19)  │
└──────────────┘
       │
┌──────┴───────┐      ┌──────────────┐
│     api      │ :5000│   api_db     │
│ (Express 5)  │◄────►│ (MongoDB 8.3)│
└──────────────┘      └──────────────┘
       
┌──────────────┐      ┌──────────────┐
│     auth     │ :5001│   auth_db    │
│ (Express 5)  │◄────►│ (MongoDB 8.3)│
└──────────────┘      └──────────────┘
```

## Технологии

| Компонент | Технология | Версия |
|-----------|-----------|--------|
| Runtime | Node.js | 22 LTS (Jod) |
| Frontend | React | 19.2.8 |
| Backend | Express | 5.2.1 |
| ORM | Mongoose | 9.9.3 |
| Database | MongoDB | 8.3 |
| Reverse Proxy | Nginx | 1.30 |
| Container | Docker | 29.7 |
| Orchestration | Docker Compose | v2 |

## Быстрый старт

### Установка Docker Desktop

1. Скачайте [Docker Desktop 4.87](https://www.docker.com/products/docker-desktop/)
2. Убедитесь, что WSL 2 установлен и активен:
   ```bash
   wsl --version
   wsl --update
   ```
3. Запустите Docker Desktop

### Запуск (Production)

```bash
docker compose up -d --build
```

Приложение доступно по адресу: http://localhost

### Запуск (Development)

```bash
docker compose -f docker-compose.yml -f docker-compose.development.yml up -d --build
```

### Остановка

```bash
docker compose down
```

### Остановка с удалением данных

```bash
docker compose down -v
```

## Структура проекта

```
docker-config/
├── api/                    # API сервис
│   ├── src/                # Исходный код
│   ├── Dockerfile          # Dockerfile для продакшена
│   ├── package.json        # Зависимости
│   └── .env                # Переменные окружения
├── auth/                   # Auth сервис
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile.prod     # Dockerfile для продакшена
│   ├── Dockerfile.dev      # Dockerfile для разработки
│   └── package.json
├── nginx/                  # Nginx конфигурация
│   ├── nginx.conf.prod
│   └── nginx.conf.dev
├── docker-compose.yml
├── docker-compose.development.yml
└── README.md
```

## Переменные окружения

### API (.api/.env)

```
PORT=5000
MONGODB_URI=mongodb://api_db:27017/api
```

### Auth (.auth/.env)

```
PORT=5001
MONGODB_URI=mongodb://auth_db:27017/auth
```

## Полезные команды

```bash
# Просмотр логов
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f api

# Пересборка образов
docker compose build --no-cache

# Проверка конфигурации
docker compose config

# Вход в контейнер
docker compose exec api sh

# Проверка статуса
docker compose ps
```

## Development

В режиме разработки:
- Frontend: http://localhost:3000 (с hot-reload)
- API: http://localhost:5000
- Auth: http://localhost:5001
- MongoDB: localhost:27017

Изменения в коде автоматически перезагружаются через nodemon (backend) и React dev server (frontend).

## Production

В продакшен режиме:
- Все запросы идут через Nginx на порту 80
- Frontend собирается и раздается через `serve`
- MongoDB данные сохраняются в Docker volumes

## Лицензия

ISC
