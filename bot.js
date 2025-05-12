const TelegramBot = require('node-telegram-bot-api');
const token = '8063630104:AAFujvBcksIRE1zcyckECu7YkR5fb4TKa4A';  // Замените на ваш токен от BotFather

const bot = new TelegramBot(token, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Отправка сообщения с кнопкой для перехода в игру
  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы начать троллить!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Перейти в игру',
            web_app: { url: 'https://your-app-name.herokuapp.com' }  // Укажите URL вашего веб-приложения
          }
        ]
      ]
    }
  });
});
