require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

console.log('🔄 Начинаем запуск бота...');
console.log('📁 Проверяем переменные окружения...');

const token = process.env.BOT_TOKEN;

// Детальная проверка токена
if (!token) {
    console.error('❌ ОШИБКА: BOT_TOKEN не найден в .env файле');
    console.log('📝 Проверьте, что в файле .env есть строка: BOT_TOKEN=ваш_токен');
    process.exit(1);
}

if (token.includes('ВАШ_НОВЫЙ_ТОКЕН_ЗДЕСЬ')) {
    console.error('❌ ОШИБКА: Вы не заменили ВАШ_НОВЫЙ_ТОКЕН_ЗДЕСЬ на реальный токен!');
    console.log('📝 Откройте файл .env и замените ВАШ_НОВЫЙ_ТОКЕН_ЗДЕСЬ на токен от @BotFather');
    process.exit(1);
}

console.log('✅ Токен найден:', token.substring(0, 10) + '...');
console.log('🚀 Создаем экземпляр бота...');

try {
    const bot = new TelegramBot(token, { 
        polling: { 
            interval: 300,
            autoStart: true
        } 
    });

    console.log('✅ Экземпляр бота создан');
    console.log('📡 Начинаем polling...');

    // Команда /start
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name || 'пользователь';
        
        console.log(`👋 Получен /start от ${userName} (ID: ${chatId})`);
        
        bot.sendMessage(chatId, `Привет, ${userName}! Нажми кнопку, чтобы начать троллить! 🎮`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '🎮 Перейти в игру',
                            web_app: { url: process.env.WEB_APP_URL }
                        }
                    ]
                ]
            }
        }).then(() => {
            console.log(`✅ Сообщение отправлено пользователю ${userName}`);
        }).catch(error => {
            console.error('❌ Ошибка отправки сообщения:', error);
        });
    });

    // События бота
    bot.on('message', (msg) => {
        if (!msg.text?.startsWith('/')) {
            console.log(`💬 Сообщение от ${msg.from.first_name}: ${msg.text}`);
        }
    });

    bot.on('polling_error', (error) => {
        console.error('❌ Ошибка polling:', error.message);
        
        if (error.message.includes('409')) {
            console.log('💡 Подсказка: Возможно, уже запущен другой экземпляр бота');
        } else if (error.message.includes('401')) {
            console.log('💡 Подсказка: Неверный токен бота. Проверьте BOT_TOKEN в .env');
        }
    });

    bot.on('webhook_error', (error) => {
        console.error('❌ Ошибка webhook:', error);
    });

    console.log('================================');
    console.log('🤖 БОТ УСПЕШНО ЗАПУЩЕН!');
    console.log('📱 Отправьте /start вашему боту в Telegram');
    console.log('================================');

} catch (error) {
    console.error('❌ Критическая ошибка при создании бота:', error);
    process.exit(1);
}