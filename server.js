require('dotenv').config();
const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Используем токен из переменных окружения
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Проверка токена
if (!token || token === 'YOUR_BOT_TOKEN') {
    console.error('❌ BOT_TOKEN не настроен правильно');
    process.exit(1);
}
// Отдаем статические файлы
app.use(express.static(path.join(__dirname, 'docs')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Обработчик для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы начать игру!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Перейти в игру',
            web_app: { url: 'https://savageswag.github.io/trollface-clicker/' }  // Замените на ваш URL
          }
        ]
      ]
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
