# Базовый образ
FROM node:latest

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов зависимостей
COPY package.json package-lock.json ./

# Установка зависимостей
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Открытие порта
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
