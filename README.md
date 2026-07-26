
# 💊 Pharma Catalog — Каталог лекарственных средств

Учебный проект, созданный для глубокого освоения Next.js 16 (App Router), Radix UI, Prisma и Auth.js. Представляет собой веб-приложение для просмотра и управления каталогом лекарственных препаратов с системой аутентификации пользователей.

---

## 🚀 Основные возможности

- **Аутентификация и авторизация**  
  Регистрация / вход / выход с использованием `next-auth` (CredentialsProvider, JWT-сессии). Пароли хэшируются через `bcryptjs`.

- **Каталог препаратов**  
  Отображение списка лекарств с карточками, детальная страница каждого препарата. (Моковые данные — в перспективе интеграция с БД).

- **Модальные окна**  
  Вход и регистрация через модалки на основе `@radix-ui/react-dialog`.

- **Адаптивный интерфейс**  
  Стилизация с помощью Tailwind CSS, поддержка тёмной темы.

- **Отслеживание ошибок**  
  Интеграция с Sentry для мониторинга и логирования ошибок.

- **Современный стек**  
  Server Components, Server Actions, параллельные маршруты, перехватывающие маршруты, Zustand для клиентского состояния.

---

## 🧰 Технологии

| Технология | Назначение |
|------------|------------|
| [Next.js 16 (App Router)](https://nextjs.org) | Фреймворк для React‑приложений |
| [TypeScript](https://www.typescriptlang.org) | Типизация |
| [Tailwind CSS](https://tailwindcss.com) | Утилитарный CSS-фреймворк |
| [Radix UI](https://www.radix-ui.com) | Headless-компоненты для доступного интерфейса |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Валидация форм |
| [Prisma ORM](https://www.prisma.io) | Работа с PostgreSQL (Prisma Postgres) |
| [Auth.js (NextAuth)](https://authjs.dev) | Аутентификация (Credentials Provider, JWT) |
| [Zustand](https://zustand-demo.pmnd.rs) | Управление клиентским состоянием (auth store) |
| [TanStack Query](https://tanstack.com/query) | (В плане) для кэширования и синхронизации данных |
| [Sentry](https://sentry.io) | Отслеживание ошибок |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Хэширование паролей |
| [Lucide React](https://lucide.dev) | Иконки |

---

## 📦 Требования

- Node.js 20.x или выше
- npm / pnpm / yarn / bun
- Аккаунт на [Prisma Data Platform](https://console.prisma.io) (для облачной БД)

---

## 🛠 Установка и запуск

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/ваш-username/pharma-catalog.git
   cd pharma-catalog
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения**  
   Скопируйте `.env.example` в `.env` и заполните:
   ```env
   DATABASE_URL=postgres://... (строка подключения Prisma Postgres)
   NEXTAUTH_SECRET=сгенерированный_секрет
   ```

4. **Примените схему Prisma**
   ```bash
   npx prisma db push
   ```

5. **Запустите сервер разработки**
   ```bash
   npm run dev
   # или bun dev / pnpm dev / yarn dev
   ```

6. **Откройте http://localhost:3000**

---

## 🔐 Переменные окружения

| Переменная | Обязательная | Описание |
|------------|--------------|----------|
| `DATABASE_URL` | Да | Строка подключения к PostgreSQL (Prisma Postgres) |
| `NEXTAUTH_SECRET` | Да | Секретный ключ для JWT-токенов (генерируется `npx auth secret`) |
| `SENTRY_DSN` | Нет | DSN проекта для отправки ошибок в Sentry |
| `NEXTAUTH_URL` | Нет | По умолчанию `http://localhost:3000` |

---

## 📁 Структура проекта (основные папки)

```bash
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Публичные страницы (без авторизации)
│   ├── (protected)/        # Защищённые страницы (только для авторизованных)
│   ├── @modal/             # Параллельный слот для модальных окон
│   └── api/                # API-роуты (включая Auth.js)
├── actions/                # Server Actions (регистрация, вход, выход)
├── components/
│   ├── ui/                 # UI‑компоненты на Radix (Button, Input, Modal)
│   ├── common/             # Переиспользуемые компоненты (Header, DrugCard)
│   └── forms/              # Формы (LoginForm, RegisterForm)
├── lib/
│   ├── db/                 # Инициализация Prisma Client
│   ├── config/             # Конфигурация сайта
│   └── api.ts              # Моковые данные для каталога
├── hooks/                  # Кастомные хуки (useAuth)
├── store/                  # Zustand-сторы (authStore)
├── utils/                  # Утилиты (валидация, cn)
├── auth.ts                 # Конфигурация NextAuth
└── types/                  # TypeScript-типы
```

---

## 🧪 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки (Turbopack) |
| `npm run build` | Сборка для продакшена |
| `npm run start` | Запуск собранного приложения |
| `npm run lint` | Проверка кода ESLint |
| `npx prisma generate` | Генерация Prisma Client |
| `npx prisma db push` | Применение схемы к БД (без миграций) |
| `npx prisma studio` | Визуальный редактор данных |

---

## 🚀 Деплой

Проект оптимизирован для деплоя на [Vercel](https://vercel.com).
1. Загрузите код в репозиторий GitHub.
2. Импортируйте проект в Vercel.
3. Добавьте переменные окружения (`DATABASE_URL`, `NEXTAUTH_SECRET`, `SENTRY_DSN`).
4. Деплой произойдёт автоматически после каждого коммита в `main`.

---

## 📌 Что дальше (план развития)

- [ ] Реализация CRUD для препаратов (админ-панель)
- [ ] Подключение TanStack Query для загрузки данных
- [ ] Поиск, фильтрация и пагинация
- [ ] Загрузка изображений препаратов
- [ ] Тесты (Jest, React Testing Library)
