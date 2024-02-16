# Guitar Shop

- Автор: [Вадим Антипов](https://up.htmlacademy.ru/nodejs-2/5/user/2299899)

## Запуск проект

### 1. Создать `.env` файл

Создать `.env` файл в корне проекта. Список переменных и их описание приведено в разделе "[Переменные окружения](#переменные-окружения)". В корне проекта приведен пример файла `.env-example`.

### 2. Установить все зависимости

```
npm i
```

### 3. Установить внешние сервисы через Docker

```
docker compose --file ./apps/backend/docker-compose.yml --env-file ./.env --project-name "guitar-shop" up -d --remove-orphans
```

### 4. Сгенерировать клиент PrismaClient и применить миграции

```
npx nx run backend:db:generate
npx nx run backend:db:migrate
```

### 5. Наполнить базу моковыми данными

```
npm run cli -- --generate 20 postgresql://admin:123456@localhost:5432/guitar_shop?schema=public
```

### 6. Запустить проект

Окно терминала 1:

```
npm run backend
```

Окно терминала 2:

```
npm run frontend
```

## Сценарии

- `cli` - запук CLI утилиты для генерации моковых данных и заполнения базы данных. Команды:
  - `--help` - показать справку
  - `--generate <n> <connection string>` - генерация `<n>` записей и наполнение базы данных по адресу `<connection string>`. Пример:
  ```
  npm run cli -- --generate 10 postgresql://admin:123456@localhost:5432/guitar_shop?schema=public
  ```
- `backend` - запуск бэкэнд приложения
- `frontend` - запуск фронтэнд приложения

## Переменные окружения

Файл `.env` в корне проекта.

| <Переменная>=<пример>                                                                  | Описание                                                                                                                                            |
| :------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| HOST=localhost                                                                         | Адрес хоста                                                                                                                                         |
| BACKEND_PORT=3001                                                                      | Порт приложения `backend`                                                                                                                           |
| UPLOAD_DIRECTORY_PATH=<BASE_DIR>/uploads                                               | Директория для загрузки файло, <BASE_DIR> - указать абсолютный путь до базовой директории проекта                                                   |
|                                                                                        |                                                                                                                                                     |
| JWT_ACCESS_TOKEN_SECRET=cgvhbjnkg8nkrfhonjlwfspl                                       | Секрет JWT access токена                                                                                                                            |
| JWT_ACCESS_TOKEN_EXPIRES_IN=5m                                                         | Время жизни JWT access токена                                                                                                                       |
| JWT_REFRESH_TOKEN_SECRET=hbfsvojipfjvpjpjpgoportkop                                    | Секрет JWT refresh токена                                                                                                                           |
| JWT_REFRESH_TOKEN_EXPIRES_IN=5m                                                        | Время жизни JWT refresh токена                                                                                                                      |
|                                                                                        |                                                                                                                                                     |
| FAKE_SMTP_SERVER_PORT_1=8025                                                           | Порт 1 для создания докер контейнера `Fake SMPT Server`                                                                                             |
| FAKE_SMTP_SERVER_PORT_2=1083                                                           | Порт 2 для создания докер контейнера `Fake SMPT Server`                                                                                             |
| MAIL_SMTP_HOST=localhost                                                               | Сервер для отправляемых писем                                                                                                                       |
| MAIL_SMTP_PORT=8025                                                                    | Порт для отправляемых писем                                                                                                                         |
| MAIL_USER_NAME=name                                                                    | Имя пользователя SMTP сервера                                                                                                                       |
| MAIL_USER_PASSWORD=password                                                            | Пароль SMTP сервера                                                                                                                                 |
| MAIL_FROM=localhost@local.local                                                        | Адрес отправителя писем                                                                                                                             |
|                                                                                        |                                                                                                                                                     |
| POSTGRES_PORT=5432                                                                     | Порт для создания докер контейнера `PostgreSQL`                                                                                                     |
| POSTGRES_USER=admin                                                                    | Пользователь Postgres                                                                                                                               |
| POSTGRES_PASSWORD=123456                                                               | Пароль Postgres                                                                                                                                     |
| POSTGRES_DB=guitar_shop                                                                | Название базы данных Postgres                                                                                                                       |
| PGADMIN_DEFAULT_EMAIL=local@local.local                                                | Логин PGAdmin                                                                                                                                       |
| PGADMIN_DEFAULT_PASSWORD=a12345678                                                     | Пароль PGAdmin                                                                                                                                      |
| PGADMIN_PORT=8081                                                                      | Порт для создания докер контейнера `PGAdmin`                                                                                                        |
| DATABASE_URL=postgresql://<user>:<password>@localhost:<port>/guitar_shop?schema=public | Url для подключения к базе данных: <user> - пользователь из POSTGRES_USER, <password> - пароль из POSTGRES_PASSWORD, <port> - порт из POSTGRES_PORT |
|                                                                                        |                                                                                                                                                     |
| DEFAULT_USER_NAME=admin                                                                | Имя пользователя для генерации моковых данных                                                                                                       |
| DEFAULT_USER_EMAIL=admin@local.local                                                   | Электронная почта для генерации моковых данных                                                                                                      |
| DEFAULT_USER_PASSWORD=admin                                                            | Пароль для генерации моковых данных                                                                                                                 |
|                                                                                        |                                                                                                                                                     |
| VITE_FRONTEND_HOST=localhost                                                           | Адрес хоста приложения `frontend`                                                                                                                   |
| VITE_FRONTEND_PORT=3000                                                                | Порт vite приложения `frontend`                                                                                                                     |
| VITE_FRONTEND_PREVIEW_PORT=3100                                                        | Порт превью vite приложения `frontend`                                                                                                              |

## Схема проекта

<img src="./specification/specification.png">
