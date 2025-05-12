const express = require('express');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Токен бота (замените на ваш)
const token = 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Отдаем статические файлы
app.use(express.static(path.join(__dirname, 'public')));

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
            web_app: { url: 'https://your-app-name.herokuapp.com' }  // Замените на ваш URL
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
